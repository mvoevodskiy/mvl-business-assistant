const BotController = require('mvl-db-bot-controller');
/**
 * @class mvlbaWorkersController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaWorkersController extends BotController {

    caption = 'mvlbaWorkers';
    modelName = 'mvlbaWorker';
    fields = {
        equals: [
            // {field: 'role', human: 'role', modelField: 'name', model: '', where: {}},
        ],
        list: ['id', 'name', 'role', 'phone']
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
                answers_single_query: 'answers.manage_workers.query.answer',
                answers_add: 'answers.manage_workers_add',
                answers_selected: 'answers.manage_workers.selected.answer',
            },
            exportFilename: 'workers',
        })
    }

}

module.exports = mvlbaWorkersController;