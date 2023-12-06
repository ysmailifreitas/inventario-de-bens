// controllers/auth.js
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const agente = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "suportetester1@hotmail.com",
        pass: "suporteinventariobens123",
    },
});

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ where: { username: username } });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = username;
            res.render('home');
        } else {
            res.render('login', { errorMessage: 'Credenciais inválidas. Verifique seu nome de usuário e senha e tente novamente.' });
        }
    } catch (error) {
        console.error('Erro ao encontrar usuário:', error);
        res.render('login', { errorMessage: 'Ocorreu um erro durante o login. Tente novamente mais tarde.' });
    }
};

exports.resetPassword = async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;

    try {
        const user = await User.findOne({ where: { resetToken: token } });

        if (!user || user.resetTokenExpires < Date.now()) {
            return res.render('resetPassword', { errorMessage: 'Invalid or expired reset token. Please try again.' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;

        await user.save();

        return res.redirect('/login');
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.render('resetPassword', { errorMessage: 'An error occurred. Please try again later.' });
    }
};



exports.showResetPasswordForm = async (req, res) => {
    const token = req.params.token;

    try {
        const user = await User.findOne({ where: { resetToken: token } });

        if (!user || user.resetTokenExpires < Date.now()) {
            return res.render('resetPassword', { errorMessage: 'Invalid or expired reset token. Please try again.' });
        }

        res.render('resetPassword', { token });
    } catch (error) {
        console.error('Error in showResetPasswordForm:', error);
        res.render('resetPassword', { errorMessage: 'An error occurred. Please try again later.' });
    }
};

exports.showForgotPasswordPage = (req, res) => {
    res.render('forgotPassword');
};

exports.sendPasswordResetEmail = async (req, res) => {
    const company_email = req.body.company_email;

    try {
        const user = await User.findOne({ where: { company_email } });

        if (!user) {
            return res.render('forgotPassword', { errorMessage: 'User not found with the provided email.' });
        }

        const resetToken = generateUniqueToken();

        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            from: "suportetester1@hotmail.com",
            to: company_email,
            subject: "Password Reset",
            html: `Click <a href="${resetLink}">here</a> to reset your password.`,
        };

        await agente.sendMail(mailOptions);

        res.render('forgotPasswordSuccess', { successMessage: 'Password reset email sent. Check your inbox.' });
    } catch (error) {
        console.error('Error in sendPasswordResetEmail:', error);
        res.render('forgotPassword', { errorMessage: 'An error occurred. Please try again later.' });
    }
};

function generateUniqueToken() {
    return uuid.v4();
}
