const Sequelize = require("sequelize");

const sequelize = new Sequelize("inventario","teste","password",{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}