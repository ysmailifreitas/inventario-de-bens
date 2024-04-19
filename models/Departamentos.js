const db = require("./db");

const Departamentos = db.sequelize.define('departamentos', {
    dep_id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dep_nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    dep_descricao: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    dep_responsavel: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Departamentos;
