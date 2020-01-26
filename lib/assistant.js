const MVTools = require('mvtools');
const Tools = require('./tools');


/**
 * @class Assistant
 *
 * @property {Object} config
 * @property {Object} controllers
 * @property {Object} defaults
 * @property {Object} handlers
 *
 * @property {MVLoader} App
 * @property {MVTools} MT
 * @property {Tools} T
 */
class Assistant {

    static exportConfig = {
        ext: {
            classes: {
                controllers: {
                    mvlbaCashController: require('./controllers/mvlbaCashController'),
                    mvlbaContractorController: require('./controllers/mvlbaContractorsController'),
                    mvlbaCashTypesController: require('./controllers/mvlbaCashTypesController'),
                    mvlbaCostArticlesController: require('./controllers/mvlbaCostArticlesController'),
                    mvlbaCostTypesController: require('./controllers/mvlbaCostTypesController'),
                    mvlbaBankAccountsController: require('./controllers/mvlbaBankAccountsController'),
                    mvlbaProjectController: require('./controllers/mvlbaProjectsController'),
                    mvlbaWorkersController: require('./controllers/mvlbaWorkersController'),
                },
                handlers: {}
            },
            configs: {
                handlers: {
                    BotHandler: {
                        botcms: {
                            db: {
                                name: 'botcms',
                            },
                            drivers: {},
                            middlewares: {},
                            networks: {},
                        },
                        schemaFiles: [
                            __dirname + '/botschemas/main.yml',
                        ],

                    },
                    DBHandler: {
                        sequelize: {
                            name: 'businessassistant'
                        },
                        models: {
                            mvlbaCash: require('./db/models/mvlbaCash'),
                            mvlbaContractor: require('./db/models/mvlbaContractor'),
                            mvlbaBankAccount: require('./db/models/mvlbaBankAccount'),
                            mvlbaProject: require('./db/models/mvlbaProject'),
                            mvlbaWorker: require('./db/models/mvlbaWorker'),
                            mvlbaSimpleList: require('./db/models/mvlbaSimpleList'),
                        }
                    }
                },
            },
        },
    };

    config = {};
    defaults = {};

    constructor (App, config = {}) {

        this.App = App;
        this.MT = new MVTools;
        this.T = new Tools(this);

        this.loadConfig(config);

    }

    loadConfig (config) {
        this.config = this.MT.mergeRecursive(this.defaults, this.config, config);
    }

}

module.exports = {
    Assistant: Assistant,

};