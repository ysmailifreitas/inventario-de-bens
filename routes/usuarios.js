const express = require('express');
const router = express.Router();
const usuariosController = require("../controllers/usuarios");

// Get Views
router.get("/cadastrarUsuario", usuariosController.getCadastroUsuarioForm);

// Ações
router.post('/cadastrarUsuario', usuariosController.cadastrarUsuario);

module.exports = router;
