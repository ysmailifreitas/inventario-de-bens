const { DataTypes } = require('sequelize');
const db = require('./db');

const PermissionAssignments = db.sequelize.define('permission-assignments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Permissions',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
});

// Adicionando os registros padrão
const defaultPermissionAssignments = [
    { id: 1, roleId: 1, permissionId: 1 },
    { id: 2, roleId: 2, permissionId: 2 },
    { id: 3, roleId: 3, permissionId: 3 },
    { id: 4, roleId: 4, permissionId: 4 }
];

PermissionAssignments.sync()
    .then(async () => {
        for (const assignment of defaultPermissionAssignments) {
            await PermissionAssignments.findOrCreate({ where: assignment });
        }
        console.log('Registros padrão de PermissionAssignments adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar e adicionar registros padrão de PermissionAssignments:', error);
    });

module.exports = PermissionAssignments;
