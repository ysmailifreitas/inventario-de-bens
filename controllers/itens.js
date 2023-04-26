const Fornecedor = require("../models/Fornecedor")
const Itens = require("../models/Itens")

exports.cadastrarItem = (req, res) => {
  let forid = req.body.
  Itens.create({
    for_id: req.body.fornecedores,
    it_nome: req.body.nome,
    it_quantidade: req.body.quantidade,
    it_dataAquisicao: req.body.data_aquisicao
  }).then(function(){
    res.redirect('/itens')
  })
}

exports.atualizarItem = (req, res) => {
  Itens.findOne({
    where: {id: req.params.id}
  }).then(function(item){
    if(item){
      item.update({
        it_nome: req.body.descricao,
        it_quantidade: req.body.quantidade,
        it_dataAquisicao: req.body.data_aquisicao,
        for_id: req.body.fornecedores
      }).then(function(){
        res.redirect('/itens')
      })
    }
  })
}

exports.deletarItem = (req, res) => {
  Itens.destroy({
    where: {id: req.params.id}
  }).then(function(){
    res.redirect(req.get('referer'));
  }).catch(function(erro){
    res.send('item não deletado')
  })
}