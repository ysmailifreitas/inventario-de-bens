const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const cadastrosController = require("../controllers/cadastros");

router.use(checkAuth);

// Get Views
router.get("/cadastrarLocalizacao", cadastrosController.getCadastroLocalizacao);
router.get("/cadastrarDepartamento", cadastrosController.getCadastroDepartamento);

// Ações
router.post("/cadastrarLocalizacao", cadastrosController.cadastrarLocalizacao);
router.post("/cadastrarDepartamento", cadastrosController.cadastrarDepartamento);

module.exports = router;