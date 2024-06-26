const express = require("express");
const router = express.Router();
const patrimonioController = require("../controllers/patrimonioController");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

// Get Views
router.get("/patrimonio", patrimonioController.getPatrimonioListagem);
router.get("/patrimonio/entrada", patrimonioController.getEntradaListagem);
router.get("/patrimonio/saida", patrimonioController.getSaidaListagem);
router.get("/patrimonio/entrada/novaEntrada", patrimonioController.getCadastroEntradaForm);
router.get("/patrimonio/saida/novaSaida", patrimonioController.getCadastroSaidaForm);
router.get("/patrimonio/:id", patrimonioController.getVisualizacaoPatrimonio);
router.get("/cadastrarPatrimonio", patrimonioController.getCadastroPatrimonioForm);
router.get("/editarPatrimonio/:id", patrimonioController.getEdicaoPatrimonioForm);

// Ações
router.post("/novaEntrada", patrimonioController.cadastrarNovaEntrada);
router.post("/novaSaida", patrimonioController.cadastrarNovaSaida);
router.post("/atualizarPatrimonio/:id", patrimonioController.atualizarPatrimonio);
router.get("/deletarPatrimonio/:id", patrimonioController.deletarPatrimonio);

module.exports = router;