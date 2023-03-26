const Bens = require("../models/Bens")

exports.cadastrarBem = (req, res) => {
  const descricao = req.body.descricao;
  const quantidade = req.body.quantidade;
  const fornecedor = req.body.fornecedor;
  const data_aquisicao = req.body.data_aquisicao;

  Bens.create({
    nome: descricao,
    fornecedor: fornecedor,
    quantidade: quantidade,
    dataAquisicao: data_aquisicao
  }).then(function(){
    res.redirect('/listarBem')
  })
}