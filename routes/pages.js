const express = require("express");
const router = express.Router();
const Bens = require('../models/Itens');
const Fornecedor = require("../models/Fornecedor");

router.get("/login", (req, res) =>{
  res.render("login");
})

router.get("/", (req, res) =>{
  res.render("home");
})

router.get("/home", (req, res) =>{
  res.render("home");
})

router.get("/itens", (req, res) =>{
  Bens.findAll().then(function(itens){
    res.render("itens", {itens:itens});
  })
})

router.get("/fornecedores", (req, res) =>{
  Fornecedor.findAll().then(function(fornecedores){
    res.render("fornecedores", {fornecedores:fornecedores});
  })
})

router.get("/cadastrarItem", (req, res) =>{
  res.render("cadastroItem");
})

router.get('/editarItem/:id', function(req,res){
  Bens.findOne({
    where: {id: req.params.id}
  }).then(function(item){
    res.render("editarItem", {item: item, id: req.params.id});
  })
})

router.get("/cadastrarFornecedor", (req, res) =>{
  res.render("cadastroFornecedor");
})

router.get('/editarFornecedor/:id', function(req,res){
  Fornecedor.findOne({
    where: {id: req.params.id}
  }).then(function(fornecedor){
    res.render("editarFornecedor", {fornecedor: fornecedor, id: req.params.id});
  })
})

module.exports = router;