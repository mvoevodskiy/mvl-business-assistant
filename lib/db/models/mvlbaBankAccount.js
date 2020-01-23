module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        bank_name: Sequelize.STRING,
        bik: Sequelize.STRING,
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};