const { DataTypes} = require('sequelize');
const db = require('./db');
const Tickets = require('./Tickets')
const {Usuarios} = require("./Usuarios");

const Comentarios = db.sequelize.define('comentarios', {
    cmnt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cmnt_texto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    tableName: 'comentarios',
    createdAt: true,
    updatedAt: true
});

Comentarios.belongsTo(Usuarios, {foreignKey:'usr_id', as: 'usuario'});

module.exports = Comentarios;