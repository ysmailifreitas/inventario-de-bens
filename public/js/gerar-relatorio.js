const nodemailer = require('nodemailer');

const agente = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // host do servidor smtp do Outlook.com
  port: 587, // porta do servidor SMTP
  secure: false, // definir a conexao
  auth: {
    user: 'suportetester1@hotmail.com', // endereco de email do bot
    pass: 'suporteinventariobens123' // senha do bot
  }
});

const mailOptions = {
  from: 'suportetester1@hotmail.com', // Endereco de e-mail do remetente no caso do bot
  to: '', // Endereco de email enviado
  subject: 'Assunto do e-mail', // assunto do email
  text: 'Corpo do e-mail'     //texto do email para enviar
};

agente.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Erro (500)', error);
  } else {
    console.log('E-mail enviado com sucesso: (200)', info.response);
  }
});
