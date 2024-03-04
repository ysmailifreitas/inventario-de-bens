const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const RolePermissions = db.sequelize.define('role_permissions', {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'role_id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'permissions',
            key: 'permission_id'
        }
    }
}, {
    timestamps: false, // To disable createdAt and updatedAt columns
    primaryKey: true
});

RolePermissions.sync()
    .then(() => {
        console.log('Tabela de role_permissions sincronizada com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de ROLE_PERMISSIONS:', error);
    });

module.exports = RolePermissions;
