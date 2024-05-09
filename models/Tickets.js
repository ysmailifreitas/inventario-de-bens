const { DataTypes} = require('sequelize');
const db = require('./db');
const {Usuarios} = require("./Usuarios");

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
        unique: true
    },
    ticket_descricao: {
        type: DataTypes.STRING
    },
    ticket_status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ticket_prioridade: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

module.exports = Tickets;
