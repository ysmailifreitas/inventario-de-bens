const nodemailer = require("nodemailer");

// TODO IMPLEMENTAR A emailService E REFATORAR A CONTROLLER PARA SOMENTE EXECUTAR A CONSULTA DA SERVICE

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

exports.enviarEmail = (req, res) => {
    const {email, assunto, texto} = req.body;

    const emailOptions = {
        ...mailOptions,
        to: email,
        subject: assunto,
        text: texto,
    };

    agente.sendMail(emailOptions, (error, info) => {
        if (error) {
            res.status(500).send("Erro ao enviar o e-mail");
        } else {
            res.status(200).send("E-mail enviado com sucesso");
        }
    });
}