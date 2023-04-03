const db = require("./db");
const Fornecedor = require("./Fornecedor");

const Itens = db.sequelize.define('itens',{
  it_nome:{
    type: db.Sequelize.STRING
  },
  it_quantidade:{
    type: db.Sequelize.INTEGER
  },
  it_dataAquisicao:{
    type: db.Sequelize.DATEONLY
  }
})

Itens.sync({force:true})
// Itens.belongsTo(Fornecedor);
// Fornecedor.hasMany(Itens);


module.exports = Itens;