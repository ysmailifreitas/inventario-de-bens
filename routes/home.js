const PDFDocument = require('pdfkit');
const express = require("express");
const router = express.Router();
const { Sequelize, Model, DataTypes } = require("sequelize");
const Itens = require("../models/Itens");
const Fornecedor = require("../models/Fornecedor");
const Usuarios = require("../models/Users")
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get('/home', async (req, res) => {
  try {
    const item = await Itens.findAll();
    const total_itens = await Itens.count();
    const total_fornecedores = await Fornecedor.count();
    const total_usuarios = await Usuarios.count();
    const preco_total = await Itens.sum('it_valor_total');
    res.render('home', { total_usuarios, total_itens, total_fornecedores, preco_total, item });
  } catch (error) {
    console.error('Erro ao fazer contagens:', error);
    res.status(500).send('Erro ao fazer contagens');
  }

  Itens.findAll().then(function (itens) {
          res.render("home", {itens, username: req.session.username});
      });
});

router.get('/gerar-pdf', async (req, res) => {
    // Criar um novo documento PDF
    const doc = new PDFDocument();
    const itensRelatorio = await Itens.findAll();

    // Configurar o cabeçalho para enviar um PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

    // Canalizar o PDF diretamente para a resposta
    doc.pipe(res);

    // Configuração da tabela (tamanhos das colunas e posição)
    const tableTop = 50;
    const column1 = 50;
    const column2 = 150;
    const column3 = 250;
    const column4 = 350;
    const column5 = 450;
    const column6 = 550; // Adicionando uma nova coluna
    const rowHeight = 15;
    const backgroundColors = ['#f2f2f2', '#ffffff']; // Cores de fundo alternadas para as linhas
    const textOptions = { margin: 'auto' };

    // Adicionar cabeçalhos das colunas com estilo
    doc.rect(column1, tableTop, column6 - column1, rowHeight)
       .fillAndStroke('#cccccc', '#000000'); // Preencher com cinza claro e borda preta
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000').text('Nome', column1 + 5, tableTop + 2, textOptions);
    doc.text('Quantidade', column2 + 5, tableTop + 2, textOptions);
    doc.text('Data Aquisição', column3 + 5, tableTop + 2, textOptions);
    doc.text('Fornecedor', column4 + 5, tableTop + 2, textOptions);
    doc.text('Localização', column5 + 5, tableTop + 2, textOptions); // Adicionando o cabeçalho da nova coluna

    // Adicionar os dados das colunas com estilo
    doc.font('Helvetica').fontSize(7);
    let y = tableTop + rowHeight;
    itensRelatorio.forEach((item, index) => {
        const backgroundColor = backgroundColors[index % 2];
        doc.rect(column1, y, column6 - column1, rowHeight)
           .fillAndStroke(backgroundColor, '#000000');
        doc.font('Helvetica-Bold').fontSize(7).fillColor('#000000').text(item.it_nome, column1 + 5, y + 2, textOptions);
        doc.text(item.it_quantidade.toString(), column2 + 5, y + 2, textOptions);
        doc.text(item.it_dataAquisicao, column3 + 5, y + 2, textOptions);
        doc.text(item.it_for_nome, column4 + 5, y + 2, textOptions);
        doc.text(item.it_localizacao, column5 + 5, y + 2, textOptions);

        y += rowHeight;
    });

    // Finalizar o documento
    doc.end();
});

module.exports = router;