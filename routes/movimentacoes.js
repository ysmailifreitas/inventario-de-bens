const movimentacaoController = require("../controllers/movimentacaoController");
const express = require('express');
const router = express.Router();

// Get Views
router.get("/movimentacoes", movimentacaoController.getMovimentacaoListagem);

module.exports = router;