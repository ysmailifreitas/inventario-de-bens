const express = require("express");
const router = express.Router();
const Bens = require('../models/Itens');
const Fornecedor = require("../models/Fornecedor");
const Itens = require("../models/Itens");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require("nodemailer");

const agente = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'suportetester1@hotmail.com',
    pass: 'suporteinventariobens123'
  }
});

const mailOptions = {
  from: 'suportetester1@hotmail.com',
  to: '',
  subject: 'Assunto do e-mail',
  text: 'Corpo do e-mail'
};

router.get('/relatorioItens', async (req, res) => {
  const doc = new PDFDocument();
  const filename = 'relatorioItens.pdf';
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  const stream = doc.pipe(res);

  doc.fontSize(18).text('Relatório de Itens Cadastrados', 100, 50);

  const itens = await Bens.findAll();
  itens.forEach((item, index) => {
    doc.fontSize(12).text(`\nNome: ${item.it_nome}\n Quantidade: ${item.it_quantidade}\n Fornecedor: ${item.it_for_nome}\n Aquisição: ${item.it_dataAquisicao}\n Modificação: ${item.updatedAt}\n`);
  });

  doc.end();
});

router.get('/relatorioFornecedores', async (req, res) => {
  const doc = new PDFDocument();
  const filename = 'relatorioFornecedores.pdf';
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  const stream = doc.pipe(res);

  doc.fontSize(18).text('Relatório de Fornecedores Cadastrados', 100, 50);

  const fornecedores = await Fornecedor.findAll();
  fornecedores.forEach((fornecedor) => {
    doc.fontSize(12).text(`\nNome: ${fornecedor.for_nome}\n Telefone: ${fornecedor.for_telefone}\n Email: ${fornecedor.for_email}\n Modificação: ${fornecedor.updatedAt}\n`);
  });

  doc.end();
});


router.get("/login", (req, res) =>{
  res.render("login");
})

router.get("/suporte", (req, res) =>{
  res.render("suporte");
})

router.get("/home", async (req, res) => {
  const [countItens, countFornecedores, itemComMaiorQuantidade] = await Promise.all([
    Itens.count(),
    Fornecedor.count(),
    Itens.findOne({
      attributes: ['it_nome', 'it_quantidade'],
      order: [['it_quantidade', 'DESC']],
      limit: 1
    })
  ]);
  res.render("home", {
    countItens: countItens,
    countFornecedores: countFornecedores,
    itemComMaiorQuantidade: itemComMaiorQuantidade
  });
});



router.get("/itens", (req, res) =>{
  Bens.findAll().then(function(itens){
    console.log(itens.for_id);
    res.render("itens", {itens});
  })
})

router.get("/fornecedores", (req, res) =>{
  Fornecedor.findAll().then(function(fornecedores){
    res.render("fornecedores", {fornecedores:fornecedores});
  })
})

router.get("/cadastrarItem", (req, res) =>{
  Fornecedor.findAll().then(function(fornecedores){
    const plainFornecedores = fornecedores.map((fornecedor) => fornecedor.get());
    res.render("cadastroItem", { fornecedores: plainFornecedores });
  });
})

router.get('/editarItem/:id', function(req,res){
  Bens.findOne({
    where: {id: req.params.id}
  }).then(function(item){
    res.render("editarItem", {item: item, id: req.params.id});
  })
})

router.get("/cadastrarFornecedor", (req, res) =>{
  res.render("cadastroFornecedor");
})

router.get('/editarFornecedor/:id', function(req,res){
  Fornecedor.findOne({
    where: {id: req.params.id}
  }).then(function(fornecedor){
    res.render("editarFornecedor", {fornecedor: fornecedor, id: req.params.id});
  })
})

router.post('/enviarEmail', (req, res) => {
  const { email, assunto, texto } = req.body;

  const emailOptions = {
    ...mailOptions,
    to: email,
    subject: assunto,
    text: texto
  };

  agente.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log('Erro (500)', error);
      res.status(500).send('Erro ao enviar o e-mail');
    } else {
      console.log('E-mail enviado com sucesso: (200)', info.response);
      res.status(200).send('E-mail enviado com sucesso');
    }
  });
});


module.exports = router;
