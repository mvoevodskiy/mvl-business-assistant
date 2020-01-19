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
                controllers: {},
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
                            __dirname + '/botschemas/scripts_navy.yml',
                        ],

                    },
                    DBHandler: {
                        sequelize: {
                            name: 'businessassistant'
                        },
                        models: {
                            // ,
                            // mvlContractor: __dirname + '/db/models/mvlContractor.js',
                            mvlbaContractor: require('./db/models/mvlbaContractor'),
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