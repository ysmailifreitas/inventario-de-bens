const {Sequelize, DataTypes} = require("sequelize");
const db = require("../models/db");

const User = db.sequelize.define(
    "users",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_username",
        },
        company_email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "example@example.com",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_password",
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_company_name",
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_cnpj",
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_address",
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default_fullname",
        },
        tipo_permissao: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Comum",
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

module.exports = User;
