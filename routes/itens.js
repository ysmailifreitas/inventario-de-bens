const express = require("express");
const router = express.Router();
const itensController = require('../controllers/itens')

router.post("/cadastrarBem", itensController.cadastrarBem);
// router.put("/atualizarBem/:id", itensController.atualizarBem);

module.exports = router;