const relatorioController = require("../controllers/relatorioController");
const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/gerar-pdf-patrimonio", relatorioController.GerarRelatorioPatrimonios);