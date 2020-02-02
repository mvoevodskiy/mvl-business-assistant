module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        bankName: Sequelize.STRING,
        bik: Sequelize.STRING,
        remain: {
            type: Sequelize.DECIMAL(11,2),
            allowNull: false,
            default: 0,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};