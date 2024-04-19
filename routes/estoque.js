const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const estoqueController = require("../controllers/estoque");
const Estoque = require('../models/Estoque')
const {Usuarios} = require("../models/Usuarios");

router.use(checkAuth);
router.post("/atualizarEstoque/:id", estoqueController.atualizarEstoque);
router.get("/estoque", async (req, res) => {
    const estoque = await Estoque.findAll().then((estoque)=> estoque)
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render("estoque/listagem/estoque", {estoque: estoque, username: usuarioLogado});
});

router.get("/editarEstoque/:id", async (req, res) => {
    const estoque = await Estoque.findOne({where:{estoque_id:req.params.id}}).then((estoque)=> estoque)
    res.render("estoque/edicao/editarEstoque", {estoque: estoque, estoque_id: req.params.id});
});

module.exports = router;