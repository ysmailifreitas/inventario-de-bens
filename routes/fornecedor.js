const express = require("express");
const router = express.Router();
const fornecedorController = require('../controllers/fornecedor');
const Fornecedor = require("../models/Fornecedor")
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.post("/cadastrarFornecedor", fornecedorController.cadastrarFornecedor);
router.post("/atualizarFornecedor/:id", fornecedorController.atualizarFornecedor);
router.get("/deletarFornecedor/:id", fornecedorController.deletarFornecedor);

router.get("/fornecedores", (req, res) => {
    Fornecedor.findAll().then(function (fornecedores) {
        res.render("fornecedores/listagem/fornecedores", {fornecedores: fornecedores,username: req.session.username});
    })
})

router.get("/cadastrarFornecedor", (req, res) => {
    res.render("fornecedores/cadastro/cadastroFornecedor");
});

router.get("/editarFornecedor/:id", function (req, res) {
    Fornecedor.findOne({
        where: {id: req.params.id},
    }).then(function (fornecedor) {
        res.render("fornecedores/edicao/editarFornecedor", {
            fornecedor: fornecedor,
            id: req.params.id,
            username: req.session.username
        });
    });
});

module.exports = router;