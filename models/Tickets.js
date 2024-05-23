const { DataTypes} = require('sequelize');
const db = require('./db');
const {Usuarios} = require("./Usuarios");
const Comentarios = require("./Comentarios");

const Tickets = db.sequelize.define('tickets', {
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ticket_assunto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    ticket_descricao: {
        type: DataTypes.STRING
    },
    ticket_status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    ticket_prioridade: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    tableName: 'tickets',
    createdAt: true,
    updatedAt: true
});

Tickets.belongsTo(
    Usuarios, {
        foreignKey: 'usr_id',
        as: 'usuarioId'
    }
)

Tickets.hasMany(Comentarios, {foreignKey: 'ticket_id', as: 'comentarios'});

module.exports = Tickets;