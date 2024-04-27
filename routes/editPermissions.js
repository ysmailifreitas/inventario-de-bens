const express = require('express');
const router = express.Router();
const permissionsController = require("../controllers/permissionsController");

// Get Views
router.get('/editPermissions', permissionsController.getEditarPermissoes);
router.get("/visualizarUsuario/:id", permissionsController.getVisualizarUsuario);

// Ações
router.post("/editPermissions/atualizarCargoUsuario/:id", permissionsController.atualizarCargoUsuario);

module.exports = router;