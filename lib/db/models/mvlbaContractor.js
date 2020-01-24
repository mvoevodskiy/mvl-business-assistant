module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        fullname: Sequelize.STRING,
        alias: Sequelize.STRING,
        reqInn: {
            type: Sequelize.INTEGER,
            unique: true,
        },
        reqKpp: Sequelize.INTEGER,
        reqBik: Sequelize.INTEGER,
        reqBank: Sequelize.STRING,
        reqKor: Sequelize.INTEGER,
        reqRs: Sequelize.INTEGER,
        parent: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        isDouble: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        phone: Sequelize.STRING,
        address: Sequelize.STRING,


        description: Sequelize.TEXT
    };
};