const express = require('express');
const perfilUsuarioController = require('../controllers/perfilUsuarioController');
const router = express.Router();

// Get Views
router.get('/userProfile', perfilUsuarioController.getPerfilUsuarioPage);

module.exports = router;