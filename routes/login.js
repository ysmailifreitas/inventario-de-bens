const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');

// Get Views
router.get("/login", authController.getLoginPage);
router.get("/forgot-password", authController.showForgotPasswordPage);
router.get("/reset-password/:token", authController.showResetPasswordForm);

// Ações
router.post("/forgot-password", authController.sendPasswordResetEmail);
router.post("/reset-password/:token", authController.resetPassword);
router.post("/login", authController.login);

module.exports = router;
