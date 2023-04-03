const express = require("express");
const router = express.Router();
const itensController = require('../controllers/itens')

router.post("/cadastrarItem", itensController.cadastrarItem);
router.post("/atualizarItem/:id", itensController.atualizarItem);
router.get("/deletarItem/:id", itensController.deletarItem);

module.exports = router;