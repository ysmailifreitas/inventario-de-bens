const express = require("express");
const router = express.Router();
const fornecedorController = require('../controllers/fornecedor')

router.post("/cadastrarFornecedor", fornecedorController.cadastrarFornecedor);
router.post("/atualizarFornecedor/:id", fornecedorController.atualizarFornecedor);
router.get("/deletarFornecedor/:id", fornecedorController.deletarFornecedor);

module.exports = router;