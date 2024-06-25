const { DataTypes } = require('sequelize');
const db = require("./db");
const {Usuarios} = require("./Usuarios");
const Cargos = require("./Cargos");

const CargoUsuario = db.sequelize.define('cargo_usuario', {
    usr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'usr_id'
        }
    },
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Cargos,
            key: 'cargo_id'
        }
    }
}, {
    tableName: 'cargo_usuario',
    timestamps: false,
});

CargoUsuario.belongsTo(Usuarios, { foreignKey: 'usr_id', onDelete: 'CASCADE' });

module.exports = CargoUsuario;
