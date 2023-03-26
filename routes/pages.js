const express = require("express");
const router = express.Router();
const Bens = require('../models/Bens')

router.get("/", (req, res) =>{
  res.render("index");
})

router.get("/home", (req, res) =>{
  res.render("home");
})

router.get("/cadastrarBem", (req, res) =>{
  res.render("cadastro");
})

router.get("/login", (req, res) =>{
  res.render("login");
})

router.get("/listarBem", (req, res) =>{
  Bens.findAll().then(function(bens){
    res.render("listagem", {itens:bens});
  })
})

router.get('/deletarItem/:id', function(req,res){
  Bens.destroy({
    where: {id: req.params.id}
  }).then(function(){
    res.redirect(req.get('referer'));
  }).catch(function(erro){
    res.send('item não deletado')
  })
})

router.get('/editarBem/:id', function(req,res){
  Bens.findOne({
    where: {id: req.params.id}
  }).then(function(item){
    res.render("editarBem", {item: item, id: req.params.id});
  })
})

router.post('/atualizarBem/:id', (req, res) =>{
  Bens.findOne({
    where: {id: req.params.id}
  }).then(function(item){
    console.log(`captured item: ${item.nome}`)
    if(item){
      item.update({
        nome: req.body.descricao,
        fornecedor: req.body.fornecedor,
        quantidade: req.body.quantidade,
        dataAquisicao: req.body.data_aquisicao
      }).then(function(){
        console.log("supostamente updated")
        res.redirect('/listarBem')
      })
    }
  })
})

module.exports = router;