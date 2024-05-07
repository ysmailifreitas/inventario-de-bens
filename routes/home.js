const PDFDocument = require('pdfkit');
const express = require("express");
const router = express.Router();
const { Sequelize, Model, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const Itens = require("../models/Patrimonio");
const Fornecedor = require("../models/Fornecedores");
const { Usuarios } = require("../models/Usuarios")
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

//Impressões para o front
router.get('/home', async (req, res) => {
  try {
    const total_itens = await Itens.count();
    const total_fornecedores = await Fornecedor.count();
    const total_usuarios = await Usuarios.count();
    const preco_total = await Itens.sum('pat_valor');
    res.render('home', { total_usuarios, total_itens, total_fornecedores, preco_total });
  } catch (error) {
    console.error('Erro ao fazer contagens:', error);
    res.status(500).send('Erro ao fazer contagens');
  }

  Itens.findAll().then(function (itens) {
          res.render("home", {itens, username: req.session.username});
      });
});

//Impressões para o gráfico de quantidade de Itens
router.get('/dadosGrafico', async (req, res) => {
const seisDias = new Date();
seisDias.setDate(seisDias.getDate() - 6)
const cincoDias = new Date();
cincoDias.setDate(cincoDias.getDate() - 5)
const quatroDias = new Date();
quatroDias.setDate(quatroDias.getDate() - 4)
const tresDias = new Date();
tresDias.setDate(tresDias.getDate() - 3)
const doisDias = new Date();
doisDias.setDate(doisDias.getDate() - 2)
const umDia = new Date();
umDia.setDate(umDia.getDate() - 1)

const contagemHoje = await Itens.count();

const haUmDia = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: umDia,
    },
  },
});

const haDoisDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: doisDias,
    },
  },
});

const haTresDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: tresDias,
    },
  },
});

const haQuatroDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: quatroDias,
    },
  },
});

const haCincoDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: cincoDias,
    },
  },
});

const haSeisDias = await Itens.count({
  where: {
    createdAt: {
    [Op.lt]: seisDias,
    },
  },
});

const graficoItens = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
        label: 'Estoque do Inventário',
        data: [haSeisDias, haCincoDias, haQuatroDias,
          haTresDias, haDoisDias, haUmDia, contagemHoje],
        borderWidth: 1
      }]
    };

    res.json(graficoItens)
});

//Impressões para o gráfico valor do Inventário
router.get('/graficoValor', async (req, res) => {
const seisDias = new Date();
seisDias.setDate(seisDias.getDate() - 6)
const cincoDias = new Date();
cincoDias.setDate(cincoDias.getDate() - 5)
const quatroDias = new Date();
quatroDias.setDate(quatroDias.getDate() - 4)
const tresDias = new Date();
tresDias.setDate(tresDias.getDate() - 3)
const doisDias = new Date();
doisDias.setDate(doisDias.getDate() - 2)
const umDia = new Date();
umDia.setDate(umDia.getDate() - 1)

const contagemHoje = await Itens.sum('pat_valor');

const haUmDia = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: umDia,
    },
  },
});

const haDoisDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: doisDias,
    },
  },
});

const haTresDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: tresDias,
    },
  },
});

const haQuatroDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: quatroDias,
    },
  },
});

const haCincoDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: cincoDias,
    },
  },
});

const haSeisDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: seisDias,
    },
  },
});

const valorGrafico = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
        label: 'Valor do Inventário',
        data: [haSeisDias, haCincoDias, haQuatroDias,
          haTresDias, haDoisDias, haUmDia, contagemHoje],
        borderWidth: 1
      }]
    };

    res.json(valorGrafico)
});

//Gerar PDF
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
//    doc.text('Quantidade', column2 + 5, tableTop + 2, textOptions);
    doc.text('Data Aquisição', column3 + 5, tableTop + 2, textOptions);
//    doc.text('Fornecedor', column4 + 5, tableTop + 2, textOptions);
    doc.text('Estado', column5 + 5, tableTop + 2, textOptions); // Adicionando o cabeçalho da nova coluna

    // Adicionar os dados das colunas com estilo
    doc.font('Helvetica').fontSize(7);
    let y = tableTop + rowHeight;
    itensRelatorio.forEach((item, index) => {
        const backgroundColor = backgroundColors[index % 2];
        doc.rect(column1, y, column6 - column1, rowHeight)
           .fillAndStroke(backgroundColor, '#000000');
        doc.font('Helvetica-Bold').fontSize(7).fillColor('#000000').text(item.it_nome, column1 + 5, y + 2, textOptions);
//        doc.text(item.it_quantidade.toString(), column2 + 5, y + 2, textOptions);
        doc.text(item.pat_data_aquisicao, column3 + 5, y + 2, textOptions);
//        doc.text(item.it_for_nome, column4 + 5, y + 2, textOptions);
        doc.text(item.pat_estado, column5 + 5, y + 2, textOptions);

        y += rowHeight;
    });

    // Finalizar o documento
    doc.end();
});

module.exports = router;