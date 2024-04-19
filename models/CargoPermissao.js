const {Sequelize, DataTypes} = require('sequelize');
const db = require('./db');

const CargoPermissao = db.sequelize.define('cargo-permissao', {
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cargos',
            key: 'cargo_id'
        }
    },
    perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'permissions',
            key: 'perm_id'
        }
    }
}, {
    timestamps: false,
    primaryKey: true
});

CargoPermissao.sync()
    .then(() => {
        console.log('Tabela de role_permissions sincronizada com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de ROLE_PERMISSIONS:', error);
    });

module.exports = CargoPermissao;
