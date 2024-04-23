const express = require("express");
const router = express.Router();
const patrimonioController = require("../controllers/patrimonio");
const Patrimonio = require("../models/Patrimonio");
const Fornecedor = require("../models/Fornecedores");
const Localizacao = require("../models/Localizacao");
const {checkAuth} = require('../middlewares/auth');
const {Usuarios} = require('../models/Usuarios');

router.use(checkAuth);

router.post("/cadastrarPatrimonio", patrimonioController.cadastrarPatrimonio);
router.post("/atualizarPatrimonio/:id", patrimonioController.atualizarPatrimonio);
router.get("/deletarPatrimonio/:id", patrimonioController.deletarPatrimonio);


router.get("/patrimonio", async (req, res) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    const patrimonio = await Patrimonio.findAll({
        include: [{
            model: Fornecedor,
            as: 'fornecedor',
            attributes: ['for_nome']
        }]
    });
    res.render("patrimonio/listagem/patrimonio", {patrimonio: patrimonio, username: usuarioLogado});
});

router.get("/patrimonio/:id", (req, res) => {
    const patId = req.params.id;
    Patrimonio.findOne({where: {pat_id: patId}}).then(function (pat) {
        if (pat) {
            res.send(pat);
        } else {
            res.status(404).send("Patrimonio não encontrado");
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o patrimonio.");
    });
});

router.get("/cadastrarPatrimonio", async (req, res) => {
    let fornecedores = await Fornecedor.findAll().then((fornecedores) => fornecedores);
    let localizacao = await Localizacao.findAll().then((localizacao) => localizacao);
    console.log(localizacao)
    res.render("patrimonio/cadastro/cadastroPatrimonio", {fornecedores: fornecedores, localizacao: localizacao});
});

router.get("/editarPatrimonio/:id", function (req, res) {
    Patrimonio.findOne({
        where: {pat_id: req.params.id},
    }).then(function (pat) {
        res.render("patrimonio/edicao/editarPatrimonio", {patrimonio: pat, id: req.params.id});
    });
});

module.exports = router;
