const { Sequelize, DataTypes } = require("sequelize");
const db = require("../models/db");

const User = db.sequelize.define(
  "users",
  {
    id: {
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
  },
  {}
);
// User.sync({force:true})

User.sync().then(() => {
  User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      username: "admin",
      password: "$2b$10$KeWip07yeZcurqQKAUv3ouVwbNFzM0WvaTwAG9zX7OkPceKghSoxu",
    },
  })
    .then(([user, created]) => {
      if (created) {
        console.log("Registro mock criado com sucesso.");
      } else {
        console.log("Registro mock já existe.");
      }
    })
    .catch((error) => {
      console.error("Erro ao criar registro mock:", error);
    });
});

module.exports = User;
