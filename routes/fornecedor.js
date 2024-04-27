const express = require("express");
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

// Get Views
router.get("/fornecedores", fornecedorController.getFornecedorListagem)
router.get("/cadastrarFornecedor", fornecedorController.getCadastroFornecedorForm);
router.get("/editarFornecedor/:id", fornecedorController.getEdicaoFornecedorForm);

// Ações
router.post("/cadastrarFornecedor", fornecedorController.cadastrarFornecedor);
router.post("/atualizarFornecedor/:id", fornecedorController.atualizarFornecedor);
router.get("/deletarFornecedor/:id", fornecedorController.deletarFornecedor);

module.exports = router;