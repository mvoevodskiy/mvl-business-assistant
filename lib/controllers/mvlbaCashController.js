const BotController = require('mvl-db-bot-controller');
/**
 * @class mvlbaCashController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaCashController extends BotController {

    caption = 'mvlbaCash';
    modelName = 'mvlbaCash';

    // Models Fields Eq
    fields = {
        equals: [
            {field: 'projectId', human: 'project', modelField: 'name', model: 'mvlbaProject', where: {}},
            {
                field: 'costTypeId',
                human: 'costType',
                modelField: 'value',
                model: 'mvlbaSimpleList',
                where: {type: 'costType'}
            },
            {
                field: 'costArticleId',
                human: 'costArticle',
                modelField: 'value',
                model: 'mvlbaSimpleList',
                where: {type: 'costArticle'}
            },
            {
                field: 'cashTypeId',
                human: 'cashType',
                modelField: 'value',
                model: 'mvlbaSimpleList',
                where: {type: 'cashType'}
            },
            {field: 'bankAccountId', human: 'bank', modelField: 'name', model: 'mvlbaBankAccount', where: {}},
            {field: 'bankAccountIdIn', human: 'bankIn', modelField: 'name', model: 'mvlbaBankAccount', where: {}},
            {field: 'bankAccountIdOut', human: 'bankOut', modelField: 'name', model: 'mvlbaBankAccount', where: {}},
            {field: 'contractorId', human: 'contractor', modelField: 'name', model: 'mvlbaContractor', where: {}},
        ],
        list: ['id', 'amount', 'project', 'costType', 'costArticle', 'cashType', 'bankAccount', 'contractor', 'description']
    };

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
                details_in: this.caption + '.msg.details_in',
                details_out: this.caption + '.msg.details_out',
                details_transfer: this.caption + '.msg.details_transfer',
            },
            path: {
                answers_single_query: 'answers.write_cash.query.answer',
                answers_add: 'answers.write_cash_add',
                answers_selected: 'answers.write_cash.selected.answer',
            },
            exportFilename: 'cash',
        })
    }

  /*
{
    query: { message: 'mvlbaProjects.msg.add.project_find', answer: 'Р' },
    project: { message: undefined, answer: 'Квартира' },
    costType: { message: 'mvlbaCash.msg.add.cost_type', answer: 'Объект' },
    description: { message: 'mvlbaCash.msg.add.description', answer: 'Описание' },
    costArticle: { message: undefined, answer: 'Зарплата' },
    cashType: { message: 'mvlbaCash.msg.add.cash_type', answer: 'Б/Н' },
    direction: { message: undefined, answer: 'in' },
    bank_in: { message: 'mvlbaCash.msg.add.bank_in', answer: 'Бн Сбер' },
    contractor: {
        message: 'mvlbaCashTypes.msg.add.contractor_list',
        answer: 'ООО Рога и копыта'
    },
    cost: { message: 'Укажите сумму', answer: '46775' },
    amount: { message: 'Укажите сумму', answer: '57896588' }
}
*/

    add_act = async (ctx) => {
        let cash = this.setDefaultKeys({});
        let cash2 = {};
        let answers = this.MT.extract(this.config.path.answers_add, ctx.session);
        cash = this.MT.merge(cash, await this.IEC.addIdsFromValues(answers));

        for (let key in answers) {
            if (answers.hasOwnProperty(key)) {
                cash[key] = answers[key].answer;
            }
        }

        switch (cash.direction) {
            case 'in':
                cash.bankAccountId = cash.bankAccountIdIn;
                break;
            case 'out':
                cash.bankAccountId = cash.bankAccountIdOut;
                cash.amount = -1 * cash.amount;
                break;
            case 'transfer':
                cash2 = this.MT.copyObject(cash);
                cash.bankAccountId = cash.bankAccountIdIn;
                cash2.bankAccountId = cash.bankAccountIdOut;
                cash2.amount = -1 * cash2.amount;
                break;
        }

        console.log('CASHES 1, 2: ', cash, cash2);

        Promise.all([
            (() => this.Model.create(cash))(),
            (() => cash.direction === 'transfer' ? this.Model.create(cash2) : true)()
        ])
            .then(async created => {
                // console.log(created);
                if (!this.MT.empty(created[0])) {
                    let parcel = this.newParcel();
                    for (let cash of created) {
                        if (cash instanceof Object) {
                            let values = this.MT.merge(cash.get(), await this.getValuesFromIds(cash.get()));
                            parcel.message = ctx.lexicon(this.config.lexicons.details, await this.prepareViewData(values, ctx));
                            await ctx.reply(parcel);
                        }
                    }

                    let step = ctx.BC.Scripts.extract(this.config.path.main);
                    return ctx.BC.doUpdate(step, ctx);
                }
            });
    };

    async prepareViewData (object, ctx) {
        console.log('PREPARE VIEW DATA. OBJECT ', object);
        object = await super.prepareViewData(object, ctx);
        console.log('PREPARE VIEW DATA. OBJECT AFTER SUPER ', object);
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                console.log('PREPARE VIEW DATA. KEY ' + key);
                switch (key) {
                    case 'amount':
                        // let parts = String(object[key]).split(".");
                        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        // object[key] = parts.join(",");
                        console.log('PREPARE VIEW DATA. AMOUNT. VALUE ' + object[key]);
                        object[key] = this.MT.numberToHuman(object[key]);
                        console.log('PREPARE VIEW DATA. AMOUNT. RESULT VALUE ' + object[key]);
                }
            }
        }
        return object;
    }

}

module.exports = mvlbaCashController;