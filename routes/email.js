const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

// Ações
router.post("/enviarEmail", emailController.enviarEmail);

module.exports = router;
