const Movimentacao = require("../models/Movimentacao");
const express = require('express');
const {Usuarios} = require("../models/Usuarios");
const router = express.Router();
router.get("/movimentacoes", async (req, res) => {
    const movimentacao = await Movimentacao.findAll().then((movimentacao)=> movimentacao)
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render("movimentacoes", {movimentacao: movimentacao, username: usuarioLogado});
});

module.exports = router;