// routes/login.js
const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const {Usuarios} = require("../models/Usuarios");

router.get("/login", async (req, res) => {
    if (req.session.username) {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render('home', {username: usuarioLogado});
    }else{
        res.render("login");
    }
});

router.get("/forgot-password", authController.showForgotPasswordPage);
router.post("/forgot-password", authController.sendPasswordResetEmail);

router.get("/reset-password/:token", authController.showResetPasswordForm);
router.post("/reset-password/:token", authController.resetPassword);

router.post("/login", authController.login);

module.exports = router;
