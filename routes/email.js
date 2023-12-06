const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

const agente = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "suportetester1@hotmail.com",
        pass: "suporteinventariobens123",
    },
});

const mailOptions = {
    from: "suportetester1@hotmail.com",
    to: "",
    subject: "Assunto do e-mail",
    text: "Corpo do e-mail",
};

router.post("/enviarEmail", (req, res) => {
    const {email, assunto, texto} = req.body;

    const emailOptions = {
        ...mailOptions,
        to: email,
        subject: assunto,
        text: texto,
    };

    agente.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log("Erro (500)", error);
            res.status(500).send("Erro ao enviar o e-mail");
        } else {
            console.log("E-mail enviado com sucesso: (200)", info.response);
            res.status(200).send("E-mail enviado com sucesso");
        }
    });
});

module.exports = router;
