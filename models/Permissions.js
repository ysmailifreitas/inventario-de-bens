const { DataTypes } = require('sequelize');
const db = require('./db');

const Permissions = db.sequelize.define('permissions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Adicione outras configurações ou associações conforme necessário

// Sincronize o modelo e crie registros padrão
const defaultPermissions = [
    { permission: 'adicionar_item' },
    { permission: 'editar_item' },
    { permission: 'excluir_item' },
    { permission: 'visualizar_item' }
    // Adicione outras permissões conforme necessário
];

Permissions.sync()
    .then(async () => {
        for (const permission of defaultPermissions) {
            await Permissions.findOrCreate({ where: permission });
        }
        console.log('Registros padrão de permissões adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar e adicionar registros padrão de permissões:', error);
    });

module.exports = Permissions;
