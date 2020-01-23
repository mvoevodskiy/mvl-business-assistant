module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        bankName: Sequelize.STRING,
        bik: Sequelize.STRING,
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};