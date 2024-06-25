const nodemailer = require("nodemailer");
const {Usuarios} = require('../models/Usuarios');

// TODO IMPLEMENTAR A forgotPasswordService E REFATORAR A CONTROLLER PARA SOMENTE EXECUTAR A CONSULTA DA SERVICE

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
    const { user_email, company_email } = req.body;

    try {
        const user = await Usuarios.findOne({where: { usr_email: company_email }});

        if (!user) {
            return res.render('forgotPassword', {errorMessage: 'Usuarios not found with the provided email.'});
        } else {
            const resetToken = generateUniqueToken();

            user.resetToken = resetToken;
            user.resetTokenExpires = Date.now() + 3600000;
            await user.save();

            const resetLink = `http://localhost:3000/resetPassword/${resetToken}`;
            const mailOptions = {
                 from: "suportetester1@hotmail.com",
                 to: company_email,
                 subject: "Password Reset",
                 html: `Click <a href="${resetLink}">here</a> to reset your password.`,
            };

            await agente.sendMail(mailOptions);

            res.render('forgot-password-success', {successMessage: 'Password reset email sent. Check your inbox.'});
        }


    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.render('forgot-password', {errorMessage: 'An error occurred. Please try again later.'});
    }
};

function generateUniqueToken() {

}
