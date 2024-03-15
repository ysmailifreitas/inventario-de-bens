const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Roles = db.sequelize.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const defaultRoleNames = ['Gestor', 'Administrador', 'Supervisor', 'Comum'];
const defaultDescriptions = ['Gestor do sistema', 'Administrador do Sistema', 'Supervisor do Sistema', 'Agente Comum do Sistema']

Roles.sync()
    .then(async () => {
        for (let i = 0; i < defaultRoleNames.length; i++) {
            const role_name = defaultRoleNames[i];
            const description = defaultDescriptions[i];
            await Roles.findOrCreate({
                where: { role_name },
                defaults: { role_name, description }
            });
        }

        console.log('Registros padrão de roles adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de ROLES:', error);
    });

module.exports = Roles;