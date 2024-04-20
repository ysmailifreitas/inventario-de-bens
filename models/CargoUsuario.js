const { DataTypes } = require('sequelize');
const db = require("./db");
const {Usuarios} = require("./Usuarios"); // Não é necessário desestruturar
const Cargos = require("./Cargos"); // Não é necessário desestruturar

const CargoUsuario = db.sequelize.define('cargo_usuario', {
    usr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Usuarios, // Nome do modelo, não o alias
            key: 'usr_id'
        }
    },
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Cargos, // Nome do modelo, não o alias
            key: 'cargo_id'
        }
    }
}, {
    tableName: 'cargo_usuario',
    timestamps: false,
});

module.exports = CargoUsuario;
