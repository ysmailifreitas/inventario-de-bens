const db = require("./db")

const Bens = db.sequelize.define('bens',{
  nome:{
    type: db.Sequelize.STRING
  },
  fornecedor:{
    type: db.Sequelize.STRING
  },
  quantidade:{
    type: db.Sequelize.INTEGER
  },
  dataAquisicao:{
    type: db.Sequelize.DATEONLY
  }
})
// Bens.sync({force:true})
module.exports = Bens;