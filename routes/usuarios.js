const express = require('express');
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Get Views
router.get("/cadastrarUsuario", usuariosController.getCadastroUsuarioForm);
router.get("/usuarios", usuariosController.getUsersListagem);
router.get("/deletarUsuario/:id", usuariosController.deletarUsuario);

// Ações
router.post('/cadastrarUsuario', usuariosController.cadastrarUsuario);

module.exports = router;
