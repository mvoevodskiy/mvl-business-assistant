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

    add_act = async (ctx) => {
        let cash = this.setDefaultKeys({});
        let cash2 = {};
        let answers = this.MT.extract(this.config.path.answers_add, ctx.session);
        for (let key in answers) {
            if (answers.hasOwnProperty(key)) {
                cash[key] = answers[key].answer;
            }
        }
        if (this.IEC) {
            cash = this.MT.merge(cash, await this.IEC.addIdsFromValues(this.fields.equals, cash));
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

        Promise.all([
            (() => this.Model.create(cash))(),
            (() => cash.direction === 'transfer' ? this.Model.create(cash2) : true)()
        ])
            .then(async created => {
                if (!this.MT.empty(created[0])) {
                    let parcel = this.newParcel();
                    for (let cash of created) {
                        if (cash instanceof Object) {
                            let values = cash.get();
                            if (this.IEC) {
                                values = await this.IEC.addValuesFromIds(this.fields.equals, cash.get());
                            }
                            this.changeBankAccount(values.bankAccountId, values.amount, ctx);
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
        object = await super.prepareViewData(object, ctx);
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                switch (key) {
                    case 'amount':
                        object[key] = this.MT.numberToHuman(object[key]);
                }
            }
        }
        return object;
    }

    async changeBankAccount (bid, amount, ctx = null) {
        try {
            let account = await this.DB.models.mvlbaBankAccount.findByPk(bid);
            if (!this.MT.empty(account)) {
                account.remain = (parseInt(account.remain * 100) + parseInt(amount * 100)) / 100;
                account.save();
                console.log('CHANGE ACCOUNT ID: ' + bid + '. UPDATED BY AMOUNT: ' + amount + ' NEW REMAIN: ' + account.remain);
            } else {
                console.log('CHANGE ACCOUNT ID: ' + bid);
            }
        } catch (e) {
            if (ctx !== null) {
                let parcel = this.newParcel();
                parcel.message = 'Error while changing bank account remain';
                ctx.reply(parcel);
            }
        }
    }

}

module.exports = mvlbaCashController;