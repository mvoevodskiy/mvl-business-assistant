const BotController = require('mvl-db-bot-controller');
/**
 * @class mvlbaSimpleListsController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaSimpleListsController extends BotController {

    caption = 'mvlbaSimpleLists';
    modelName = 'mvlbaSimpleList';
    type = '';

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            fields: {
                singleButton: 'value',
            },
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
            },
            path: {
                answers_single_query: 'answers.manage_simple_lists.query.answer',
                answers_add: 'answers.manage_simple_lists_add',
                answers_selected: 'answers.manage_simple_lists.selected.answer',
            },
        })
    }

    prepareGetCriteria (criteria) {
        criteria = super.prepareGetCriteria(criteria);
        if (!this.MT.empty(this.type)) {
            criteria.where = criteria.where || {};
            criteria.where.type = this.type;
        }
        return criteria;
    };

    setDefaultKeys (object) {
        object = super.setDefaultKeys(object);
        if (!this.MT.empty(this.type)) {
            object.type = this.type;
        }
        return object;
    }

}

module.exports = mvlbaSimpleListsController;