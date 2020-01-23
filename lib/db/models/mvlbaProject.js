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
        payType: Sequelize.STRING,
        responsibleId: Sequelize.STRING,
        contractorId: Sequelize.INTEGER,
        public: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};