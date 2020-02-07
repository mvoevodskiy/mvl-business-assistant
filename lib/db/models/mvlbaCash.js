module.exports = (Sequelize) => {
    return {
        projectId: Sequelize.INTEGER,
        bankAccountId: Sequelize.INTEGER,
        costTypeId: Sequelize.INTEGER,
        costArticleId: Sequelize.INTEGER,
        cashTypeId: Sequelize.INTEGER,
        direction: Sequelize.STRING(10),
        contractorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        responsibleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        amount: Sequelize.INTEGER,
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        open: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    };
};