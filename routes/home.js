const express = require("express");
const router = express.Router();
const graficosController = require("../controllers/graficosController");
const {checkAuth} = require('../middlewares/auth');
const checkPermissoes = require('../middlewares/checkPermissoes');
const homeController = require('../controllers/homeController');

router.use(checkAuth);

router.get("/", homeController.getHomeData);
router.get("/home", homeController.getHomeData);
router.get("/dadosGrafico", graficosController.getDadosGrafico);
router.get("/graficoValor", graficosController.getGraficoValor);

module.exports = router;