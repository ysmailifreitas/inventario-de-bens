const express = require("express");
const router = express.Router();
const patrimonioController = require("../controllers/patrimonioController");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

// Get Views
router.get("/patrimonio", patrimonioController.getPatrimonioListagem);
router.get("/patrimonio/:id", patrimonioController.getVisualizacaoPatrimonio);
router.get("/cadastrarPatrimonio", patrimonioController.getCadastroPatrimonioForm);
router.get("/editarPatrimonio/:id", patrimonioController.getEdicaoPatrimonioForm);

// Ações
router.post("/cadastrarPatrimonio", patrimonioController.cadastrarPatrimonio);
router.post("/atualizarPatrimonio/:id", patrimonioController.atualizarPatrimonio);
router.get("/deletarPatrimonio/:id", patrimonioController.deletarPatrimonio);

module.exports = router;
