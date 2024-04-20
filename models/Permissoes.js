const { DataTypes} = require('sequelize');
const db = require('./db');

const Permissoes = db.sequelize.define('permissoes', {
    perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    perm_nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    perm_descricao: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'permissoes'
});

module.exports = Permissoes;
