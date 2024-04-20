const { DataTypes} = require('sequelize');
const db = require('./db');
const Cargos = require('../models/Cargos');
const Permissoes = require('../models/Permissoes');

const CargoPermissao = db.sequelize.define('cargo_permissao', {
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cargos,
            key: 'cargo_id'
        }
    },
    perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permissoes,
            key: 'perm_id'
        }
    }
}, {
    tableName: 'cargo_permissao',
    timestamps: false,
});

module.exports = CargoPermissao;
