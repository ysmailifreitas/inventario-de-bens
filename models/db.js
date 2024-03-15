const Sequelize = require("sequelize");

const sequelize = new Sequelize("inventario", "user", "password", {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}