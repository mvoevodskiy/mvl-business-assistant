const BotController = require('mvl-db-bot-controller');
/**
 * @class mvlbaProjectsController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaProjectsController extends BotController {

    caption = 'mvlbaProjects';
    modelName = 'mvlbaProject';
    fields = {
        equals: [
            {field: 'contractorId', human: 'contractor', modelField: 'name', model: 'mvlbaContractor', where: {}},
            {field: 'responsibleId', human: 'responsible', modelField: 'name', model: 'mvlbaWorker', where: {}},
        ],
        list: ['id', 'name', 'amount', 'deadline', 'active', 'payType', 'responsible', 'contractor', 'public']
    };

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
                export_finished: this.caption + '.msg.export_finished',
                import_finished: this.caption + '.msg.import_finished',
                field_caption: field => this.caption + '.fieldNames.' + field,
            },
            path: {
                answers_single_query: 'answers.manage_projects.query.answer',
                answers_add: 'answers.manage_projects_add',
                answers_selected: 'answers.manage_projects.selected.answer',
            },
            exportFilename: 'projects',
        })
    }

}

module.exports = mvlbaProjectsController;