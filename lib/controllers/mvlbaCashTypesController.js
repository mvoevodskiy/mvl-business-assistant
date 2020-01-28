const mvlbaSimpleListsController = require('./mvlbaSimpleListsController');
/**
 * @class mvlbaCashTypesController
 *
 * @property {MVLoader}
 * @property {MVTools}
 * @property {BotCMS} Bot
 * @property {Sequelize} DB
 * @property {Model} Contractors
 * @property
 */
class mvlbaCashTypesController extends mvlbaSimpleListsController {

    caption = 'mvlbaCashTypes';
    modelName = 'mvlbaSimpleList';
    type = 'cashType';

    constructor (App, config) {
        super(App, config);
        this.loadConfig({
            lexicons: {
                // choose_from_list: 'common.msg.choose_from_list',
                details: this.caption + '.msg.details',
            },
            path: {
                answers_single_query: 'answers.manage_cash_types.query.answer',
                answers_add: 'answers.manage_cash_types_add',
                answers_selected: 'answers.manage_cash_types.selected.answer',
            },
            exportFilename: 'cashtypes',
        })
    }

}

module.exports = mvlbaCashTypesController;