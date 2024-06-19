const relatorioController = require("../controllers/relatorioController");
const dataRelatorioController = require("../controllers/dataRelatorioController")
const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.post("/data-relatorio", dataRelatorioController.getDataRelatorio);

router.get("/relatorios", relatorioController.getRelatoriosListagem);
router.get('/download-pdf/:id', relatorioController.getRelatorioDownload);
router.get('/deletar-relatorio/:id', relatorioController.deletarRelatorio);

module.exports = router;