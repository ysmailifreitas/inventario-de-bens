const Sequelize = require("sequelize");

const sequelize = new Sequelize("inventario", "inventario_user", "password", {
    // host: 'localhost',
    host: 'mysql',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}