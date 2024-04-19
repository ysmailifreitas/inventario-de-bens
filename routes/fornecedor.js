const express = require("express");
const router = express.Router();
const fornecedorController = require('../controllers/fornecedor');
const Fornecedor = require("../models/Fornecedores")
const {checkAuth} = require('../middlewares/auth');
const {Usuarios} = require('../models/Usuarios');

router.use(checkAuth);

router.post("/cadastrarFornecedor", fornecedorController.cadastrarFornecedor);
router.post("/atualizarFornecedor/:id", fornecedorController.atualizarFornecedor);
router.get("/deletarFornecedor/:id", fornecedorController.deletarFornecedor);

router.get("/fornecedores", (req, res) => {
    Fornecedor.findAll().then(async function (fornecedores) {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("fornecedores/listagem/fornecedores", {fornecedores: fornecedores, username: usuarioLogado});
    })
})

router.get("/cadastrarFornecedor", (req, res) => {
    res.render("fornecedores/cadastro/cadastroFornecedor");

});

router.get("/editarFornecedor/:id", function (req, res) {
    Fornecedor.findOne({
        where: {for_id: req.params.id},
    }).then(async function (fornecedor) {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("fornecedores/edicao/editarFornecedor", {
            fornecedor: fornecedor,
            id: req.params.id,
            username: usuarioLogado
        });
    });
});

module.exports = router;