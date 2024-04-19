const express = require("express");
const router = express.Router();
const Itens = require("../models/Patrimonio");
const Fornecedor = require("../models/Fornecedores");
const PDFDocument = require("pdfkit");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/relatorioItens", async (req, res) => {
    const doc = new PDFDocument();
    const filename = "relatorioItens.pdf";
    res.setHeader(
        "Content-disposition",
        'attachment; filename="' + filename + '"'
    );
    res.setHeader("Content-type", "application/pdf");

    const stream = doc.pipe(res);

    doc.fontSize(18).text("Relatório de Itens Cadastrados", 100, 50);

    const itens = await Itens.findAll();
    itens.forEach((item, index) => {
        doc
            .fontSize(12)
            .text(
                `\nNome: ${item.it_nome}\n Quantidade: ${item.it_quantidade}\n Fornecedor: ${item.it_for_nome}\n Aquisição: ${item.it_dataAquisicao}\n Modificação: ${item.updatedAt}\n`
            );
    });

    doc.end();
});

router.get("/relatorioFornecedores", async (req, res) => {
    const doc = new PDFDocument();
    const filename = "relatorioFornecedores.pdf";
    res.setHeader(
        "Content-disposition",
        'attachment; filename="' + filename + '"'
    );
    res.setHeader("Content-type", "application/pdf");

    const stream = doc.pipe(res);

    doc.fontSize(18).text("Relatório de Fornecedores Cadastrados", 100, 50);

    const fornecedores = await Fornecedor.findAll();
    fornecedores.forEach((fornecedor) => {
        doc
            .fontSize(12)
            .text(
                `\nNome: ${fornecedor.for_nome}\n Telefone: ${fornecedor.for_telefone}\n Email: ${fornecedor.for_email}\n Modificação: ${fornecedor.updatedAt}\n`
            );
    });

    doc.end();
});

module.exports = router;