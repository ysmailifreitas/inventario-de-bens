const Sequelize = require("sequelize");

const sequelize = new Sequelize("inventario", "inventario_user", "password", {
    host: 'mysql-container',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}