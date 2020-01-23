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

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
            },
            path: {
                answers_single_query: 'answers.manage_projects.query.answer',
                answers_add: 'answers.manage_projects_add',
                answers_selected: 'answers.manage_projects.selected.answer',
            },
        })
    }

}

module.exports = mvlbaProjectsController;