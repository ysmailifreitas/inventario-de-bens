// routes/login.js
const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');

router.get("/login", (req, res) => {
    if (req.session.username) {
        res.redirect('/home')
    }
    res.render("login");
});

router.get("/forgot-password", authController.showForgotPasswordPage);
router.post("/forgot-password", authController.sendPasswordResetEmail);

router.get("/reset-password/:token", authController.showResetPasswordForm);
router.post("/reset-password/:token", authController.resetPassword);

router.post("/login", authController.login);

module.exports = router;
