const { Sequelize, DataTypes } = require('sequelize');
const db = require("../models/db");

const UserRoles = db.sequelize.define('user_roles', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'role_id'
        }
    }
}, {
    timestamps: false, // To disable createdAt and updatedAt columns
    primaryKey: true
});

UserRoles.sync()
    .then(() => {
        console.log('Tabela de user_roles sincronizada com sucesso.');

        // Inserir entrada inicial
        return UserRoles.create({
            user_id: 1,
            role_id: 1
        });
    })
    .then(() => {
        console.log('Entrada inicial inserida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de USER_ROLES:', error);
    });

module.exports = UserRoles;
