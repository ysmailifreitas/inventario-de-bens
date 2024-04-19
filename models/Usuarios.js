const {Sequelize, DataTypes, where} = require("sequelize");
const db = require("../models/db");
const Cargos = require("./Cargos")

const Usuarios = db.sequelize.define(
    "usuarios",
    {
        usr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        usr_nome: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_username",
        },
        usr_pass: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_password",
        },
        usr_cargo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Comum",
        },
        usr_dep: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "GOV",
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetTokenExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {}
);

async function getUsuarioCargoNome(usuarioId) {
    let cargo = await Cargos.findOne({
        where: {
            cargo_id: usuarioId
        }
    });

    if (!cargo) {
        console.error('Nenhum cargo encontrado com o ID:', usuarioId);
        return null;
    }

    return cargo.cargo_nome;
}

module.exports = {
    Usuarios: Usuarios,
    getUsuarioCargoNome
};
