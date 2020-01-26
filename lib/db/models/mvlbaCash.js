module.exports = (Sequelize) => {
    return {
        projectId: Sequelize.INTEGER,
        bankAccountId: Sequelize.INTEGER,
        costTypeId: Sequelize.INTEGER,
        costArticleId: Sequelize.INTEGER,
        cashTypeId: Sequelize.INTEGER,
        direction: Sequelize.STRING(10),
        contractorId: Sequelize.INTEGER,
        amount: Sequelize.INTEGER,
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};