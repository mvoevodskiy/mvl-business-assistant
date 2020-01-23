module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        role: Sequelize.STRING,
        phone: Sequelize.STRING,
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};