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
  },
  for_id:{
    type: db.Sequelize.STRING
  },
  it_for_nome: {
    type: db.Sequelize.STRING
  }
})

// Itens.sync({force:true})
// Fornecedor.hasMany(Itens, {foreignKey: 'for_id'});
// Itens.belongsTo(Fornecedor, {foreignKey: 'for_id'});

module.exports = Itens;