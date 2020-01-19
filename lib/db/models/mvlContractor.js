module.exports = (sequelize, DataTypes) => {
    class botbaContractor extends sequelize.Model { }
    botbaContractor.init({
        name: DataTypes.STRING,
        fullname: DataTypes.STRING,
        alias: DataTypes.STRING(20),
        req_inn: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        req_kpp: DataTypes.INTEGER,
        req_bik: DataTypes.INTEGER,
        req_bank: DataTypes.INTEGER,
        req_kor: DataTypes.INTEGER,
        req_rs: DataTypes.INTEGER,
        parent: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        is_double: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        phone: DataTypes.STRING,
        address: DataTypes.STRING,


        description: DataTypes.TEXT
    }, { sequelize });
    return botbaContractor;
};