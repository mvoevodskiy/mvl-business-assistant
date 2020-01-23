module.exports = (Sequelize) => {
    return {
        name: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        deadline: Sequelize.STRING,
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        pay_type: Sequelize.STRING,
        responsible_id: Sequelize.STRING,
        contractor_id: Sequelize.INTEGER,
        public: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};