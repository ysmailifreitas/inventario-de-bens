const db = require("./db");
const Patrimonio = require("./Patrimonio");

const Fornecedores = db.sequelize.define('fornecedores', {
    for_id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    for_nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    for_cnpj: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    for_telefone: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    for_email: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Fornecedores;
