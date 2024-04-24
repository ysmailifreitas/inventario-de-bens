const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const estoqueController = require("../controllers/estoque");

router.use(checkAuth);

// Get Views
router.get("/estoque", estoqueController.getEstoqueListagem);
router.get("/editarEstoque/:id", estoqueController.getEdicaoEstoqueForm);

// Ações
router.post("/atualizarEstoque/:id", estoqueController.atualizarEstoque);

module.exports = router;