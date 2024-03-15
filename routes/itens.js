const express = require("express");
const router = express.Router();
const itensController = require("../controllers/itens");
const Itens = require("../models/Itens");
const Fornecedor = require("../models/Fornecedor");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.post("/cadastrarItem", itensController.cadastrarItem);
router.get("/atualizarItem/:id", itensController.atualizarItem);
router.get("/deletarItem/:id", itensController.deletarItem);


router.get("/itens", (req, res) => {
    Itens.findAll().then(function (itens) {
        console.log(itens.for_id);
        res.render("itens/listagem/itens", {itens});
    });
});

router.get("/item/:id", (req, res) => {
    const itemId = req.params.id;
    Itens.findOne({where: {id: itemId}}).then(function (item) {
        if (item) {
            res.send(item);
        } else {
            res.status(404).send("Item não encontrado");
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o item.");
    });
});

router.get("/cadastrarItem", (req, res) => {
    Fornecedor.findAll().then(function (fornecedores) {
        const plainFornecedores = fornecedores.map((fornecedor) =>
            fornecedor.get()
        );
        res.render("itens/cadastro/cadastroItem", {fornecedores: plainFornecedores});
    });
});

router.get("/editarItem/:id", function (req, res) {
    Itens.findOne({
        where: {id: req.params.id},
    }).then(function (item) {
        res.render("itens/edicao/editarItem", {item: item, id: req.params.id});
    });
});

module.exports = router;
