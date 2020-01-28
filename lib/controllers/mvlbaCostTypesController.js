const mvlbaSimpleListsController = require('./mvlbaSimpleListsController');
/**
 * @class mvlbaCostTypesController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaCostTypesController extends mvlbaSimpleListsController {

    caption = 'mvlbaCostTypes';
    modelName = 'mvlbaSimpleList';
    type = 'costType';

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
            },
            path: {
                answers_single_query: 'answers.manage_cost_types.query.answer',
                answers_add: 'answers.manage_cost_types_add',
                answers_selected: 'answers.manage_cost_types.selected.answer',
            },
            exportFilename: 'costtypes',
        })
    }

}

module.exports = mvlbaCostTypesController;