const { DataTypes} = require('sequelize');
const db = require('./db');

const Cargos = db.sequelize.define('cargos', {
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cargo_nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cargo_descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Cargos;
