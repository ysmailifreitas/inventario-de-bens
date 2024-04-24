const express = require("express");
const router = express.Router();
const relatorioController = require("../controllers/relatorio");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

// Ações
router.get("/relatorioPatrimonios", relatorioController.GerarRelatorioPatrimonio);
router.get("/relatorioFornecedores", relatorioController.GerarRelatorioFornecedor);

module.exports = router;