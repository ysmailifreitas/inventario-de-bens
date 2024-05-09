const express = require("express");
const router = express.Router();
const relatorioController = require("../controllers/relatorioController");
const homeController = require("../controllers/homeController");
const graficosController = require("../controllers/graficosController");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/home", homeController.getHomeData);
router.get("/dadosGrafico", graficosController.getDadosGrafico);
router.get("/graficoValor", graficosController.getGraficoValor);
router.get("/gerar-pdf", relatorioController.GerarRelatorio)

module.exports = router;