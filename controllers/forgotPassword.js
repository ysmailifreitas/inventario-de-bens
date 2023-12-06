// controllers/auth.js
const nodemailer = require("nodemailer");
const User = require('../models/Users');
const bcrypt = require('bcrypt');

const agente = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "suportetester1@hotmail.com",
        pass: "suporteinventariobens123",
    },
});

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('forgotPassword', { errorMessage: 'User not found with the provided email.' });
        }

        const resetToken = generateUniqueToken();

        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000;
        await user.save();

        const resetLink = `http://localhost:3000/resetPassword/${resetToken}`;
        const mailOptions = {
            from: "suportetester1@hotmail.com",
            to: email,
            subject: "Password Reset",
            html: `Click <a href="${resetLink}">here</a> to reset your password.`,
        };

        await agente.sendMail(mailOptions);

        res.render('forgot-password-success', { successMessage: 'Password reset email sent. Check your inbox.' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.render('forgot-password', { errorMessage: 'An error occurred. Please try again later.' });
    }
};

function generateUniqueToken() {
    
}
