const mvlbaSimpleListsController = require('./mvlbaSimpleListsController');
/**
 * @class mvlbaCostArticlesController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaCostArticlesController extends mvlbaSimpleListsController {

    caption = 'mvlbaCostArticles';
    modelName = 'mvlbaSimpleList';
    type = 'costArticle';

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
            },
            path: {
                answers_single_query: 'answers.manage_cost_articles.query.answer',
                answers_add: 'answers.manage_cost_articles_add',
                answers_selected: 'answers.manage_cost_articles.selected.answer',
            },
        })
    }

}

module.exports = mvlbaCostArticlesController;