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
        unique: true
    }
}, {
    tableName: 'comentarios',
    createdAt: true,
    updatedAt: true
});

Comentarios.belongsTo(Tickets, {foreignKey:'ticket_id', as: 'ticket'});
Comentarios.belongsTo(Usuarios, {foreignKey:'usr_id', as: 'usuarioId'});

module.exports = Comentarios;
