const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

// Ações
router.post("/enviarEmail", emailController.enviarEmail);

module.exports = router;
