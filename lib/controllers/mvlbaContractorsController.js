const BotController = require('mvl-db-bot-controller');
/**
 * @class mvlbaContractorsController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaContractorsController extends BotController {

    caption = 'mvlbaContractors';
    modelName = 'mvlbaContractor';

    fields = {
        equals: [
            {field: 'responsibleId', human: 'responsible', modelField: 'name', model: 'mvlbaWorker', where: {}},
        ],
        list: ['id', 'name', 'alias', 'fullname', 'address', 'phone', 'reqInn', 'reqKpp', 'reqBik', 'reqRs', 'reqKor', 'parent', 'active']
    };

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.action.choose_from_list',
                details: this.caption + '.msg.details',
            },
            path: {
                answers_single_query: 'answers.manage_contractors.query.answer',
                answers_add: 'answers.manage_contractors_add',
                answers_selected: 'answers.manage_contractors.selected.answer',
            },
            exportFilename: 'contractors',
        });
    }

}

module.exports = mvlbaContractorsController;