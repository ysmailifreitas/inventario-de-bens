const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const cadastrosController = require("../controllers/cadastros");
const {Usuarios} = require("../models/Usuarios");

router.use(checkAuth);
router.post("/cadastrarLocalizacao", cadastrosController.cadastrarLocalizacao);
router.post("/cadastrarDepartamento", cadastrosController.cadastrarDepartamento);
router.get("/cadastrarLocalizacao", async (req, res) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render("cadastros/cadastroLocalizacao", {username: usuarioLogado});
});
router.get("/cadastrarDepartamento", async(req, res) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render("cadastros/cadastroDepartamento", {username: usuarioLogado});
});

module.exports = router;