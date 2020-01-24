module.exports = (Sequelize) => {
    return {
        value: Sequelize.STRING,
        type: Sequelize.STRING,
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};