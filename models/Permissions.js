const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Permissions = db.sequelize.define('permissions', {
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    permission_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    }
});

const defaultPermissions = [
    { permission_name: 'adicionar_item', description: 'Permissão para adicionar item' },
    { permission_name: 'editar_item', description: 'Permissão para editar item' },
    { permission_name: 'excluir_item', description: 'Permissão para excluir item' },
    { permission_name: 'visualizar_item', description: 'Permissão para visualizar item' }
];

Permissions.sync()
    .then(async () => {
        for (const permissionData of defaultPermissions) {
            await Permissions.findOrCreate({
                where: { permission_name: permissionData.permission_name },
                defaults: { ...permissionData }
            });
        }

        console.log('Registros padrão de permissions adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de PERMISSIONS:', error);
    });

module.exports = Permissions;
