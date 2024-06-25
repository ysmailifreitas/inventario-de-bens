const {Usuarios} = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const uuid = require('uuid');

// TODO IMPLEMENTAR A AuthService E REFATORAR A CONTROLLER PARA SOMENTE EXECUTAR A CONSULTA DA SERVICE

const agente = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "suportetester1@hotmail.com",
        pass: "suporteinventariobens123",
    },
});

exports.getLoginPage = async (req, res) => {
    if (req.session.username) {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render('home', {username: usuarioLogado});
    } else {
        res.render("login");
    }
}

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await Usuarios.findOne({where: {usr_nome: username}});
        if (user && bcrypt.compareSync(password, user.usr_pass)) {
            req.session.username = username;
            res.redirect('/home')

        } else {
            res.render('login', {errorMessage: 'Credenciais inválidas. Verifique seu nome de usuário e senha e tente novamente.'});
        }
    } catch (error) {
        console.error('Erro ao encontrar usuário:', error);
        res.render('login', {errorMessage: 'Ocorreu um erro durante o login. Tente novamente mais tarde.'});
    }
};

exports.resetPassword = async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;

    try {
        const user = await Usuarios.findOne({where: {resetToken: token}});

        if (!user || user.resetTokenExpires < Date.now()) {
            return res.render('resetPassword', {errorMessage: 'Invalid or expired reset token. Please try again.'});
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpires = null;

        await user.save();

        return res.redirect('/login');
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.render('resetPassword', {errorMessage: 'An error occurred. Please try again later.'});
    }
};


exports.showResetPasswordForm = async (req, res) => {
    const token = req.params.token;

    try {
        const user = await Usuarios.findOne({where: {resetToken: token}});

        if (!user || user.resetTokenExpires < Date.now()) {
            return res.render('resetPassword', {errorMessage: 'Invalid or expired reset token. Please try again.'});
        }

        res.render('resetPassword', {token});
    } catch (error) {
        console.error('Error in showResetPasswordForm:', error);
        res.render('resetPassword', {errorMessage: 'An error occurred. Please try again later.'});
    }
};

exports.showForgotPasswordPage = (req, res) => {
    res.render('forgotPassword');
};

exports.sendPasswordResetEmail = async (req, res) => {
    const { company_email } = req.body;

    try {
        const user = await Usuarios.findOne({where: { usr_email: company_email }});

        if (!user) {
            return res.render('forgotPassword', {errorMessage: 'Usuarios not found with the provided email.'});
        } else {
            const resetToken = generateUniqueToken();

            user.resetToken = resetToken;
            user.resetTokenExpires = Date.now() + 3600000;
            await user.save();

            const resetLink = `http://localhost:4000/resetPassword/${resetToken}`;
            const mailOptions = {
                 from: "suportetester1@hotmail.com",
                 to: company_email,
                 subject: "Password Reset",
                 html: `Click <a href="${resetLink}">here</a> to reset your password.`,
            };

            await agente.sendMail(mailOptions);

            res.render('forgotPasswordSuccess', {successMessage: 'Password reset email sent. Check your inbox.'});
        }

    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.render('forgotPassword', {errorMessage: 'An error occurred. Please try again later.'});
    }
};

function generateUniqueToken() {
    return uuid.v4();
}
