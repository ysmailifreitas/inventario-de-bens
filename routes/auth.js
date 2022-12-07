const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')

router.post("/login", authController.login);
router.get("/home", authController.home);
router.post("/cadastrarBem", authController.cadastrarBem);

module.exports = router;
