module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        fullname: Sequelize.STRING,
        alias: Sequelize.STRING,
        req_inn: {
            type: Sequelize.INTEGER,
            unique: true,
        },
        req_kpp: Sequelize.INTEGER,
        req_bik: Sequelize.INTEGER,
        req_bank: Sequelize.STRING,
        req_kor: Sequelize.INTEGER,
        req_rs: Sequelize.INTEGER,
        parent: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        is_double: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        phone: Sequelize.STRING,
        address: Sequelize.STRING,


        description: Sequelize.TEXT
    };
};