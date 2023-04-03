const db = require("./db");
const Itens = require("./Itens");

const Fornecedor = db.sequelize.define('fornecedores',{
  for_nome:{
    type: db.Sequelize.STRING
  },
  for_telefone:{
    type: db.Sequelize.STRING
  },
  for_email:{
    type: db.Sequelize.STRING
  }
})
Fornecedor.sync({force:true})

module.exports = Fornecedor;