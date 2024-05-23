const express = require("express");
const router = express.Router();
const relatorioController = require("../controllers/relatorioController");
const graficosController = require("../controllers/graficosController");
const {checkAuth} = require('../middlewares/auth');
const checkPermissoes = require('../middlewares/checkPermissoes');
const homeController = require('../controllers/homeController');

router.use(checkAuth);

router.get("/", homeController.getHomeData);
router.get("/home", homeController.getHomeData);
router.get("/dadosGrafico", graficosController.getDadosGrafico);
router.get("/graficoValor", graficosController.getGraficoValor);
router.get("/gerar-pdf", relatorioController.GerarRelatorio)

module.exports = router;