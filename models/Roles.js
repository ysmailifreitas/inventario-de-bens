const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Roles = db.sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Certifica-se de que cada papel seja único
    }
});

const defaultRoles = ['Gestor', 'Administrador', 'Supervisor', 'Comum'];

Roles.sync()
    .then(async () => {
        for (const role of defaultRoles) {
            await Roles.findOrCreate({
                where: { role },
                defaults: { role }
            });
        }

        console.log('Registros padrão de roles adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de ROLES:', error);
    });

module.exports = Roles;