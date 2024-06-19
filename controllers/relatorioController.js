const PDFDocument = require('pdfkit');
const Itens = require("../models/Patrimonio");
const Fornecedores = require("../models/Fornecedores");
const Localizacao = require("../models/Localizacao");
const Relatorio = require("../models/Relatorio");
const fs = require('fs');

//--------------------------------------------Gera o relatório de patrimônios--------------------------------------------
exports.GerarRelatorioPatrimonios = async (req, res) => {
// Criar um novo documento PDF
    const doc = new PDFDocument();
    const itensRelatorio = await Itens.findAll();

// Configurar o cabeçalho para enviar um PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

// Canalizar o PDF diretamente para a resposta
    doc.pipe(res);

// Variáveis do cabeçalho
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentTime = new Date().toLocaleTimeString('pt-BR');
    const location = "Campo Grande, MS - Brasil";
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

// Variáveis do rodapé
    const imagePath = 'public/img/INVENTARIO-nobg.png';
    const desiredImageWidth = 66.6;
    const desiredImageHeight = 37.5;

// Cria o cabeçalho
    doc.font('Times-Roman').fontSize(10).text(`Data: ${currentDate}`, 0, 30, { align: 'center', width: pageWidth });
    doc.font('Times-Roman').fontSize(10).text(`Horário: ${currentTime}`, 0, 45, { align: 'center', width: pageWidth });
    doc.text(location, 0, 60, { align: 'center', width: pageWidth });

    doc.font('Times-Bold').fontSize(20).text('ITENS', 0, 100, { align: 'center', width: pageWidth });

// Configuração da tabela (tamanhos das colunas e posição)
    const tableTop = 130;
    const column1 = 50;
    const column2 = 150;
    const column3 = 250;
    const column4 = 350;
    const column5 = 450;
    const column6 = 550;
    const rowHeight = 15;
    const fontSize = 7;
    const verticalOffset = (rowHeight - fontSize) / 2;
    const textOptions = { width: column2 - column1, align: 'center' };


    doc.font('Times-Bold').fontSize(10).fillColor('#000000').text('Nome', column1, tableTop + verticalOffset, textOptions);
        doc.text('Data Aquisição', column2, tableTop + verticalOffset, textOptions);
        doc.text('Estado', column3, tableTop + verticalOffset, textOptions);
        doc.text('Tipo', column4, tableTop + verticalOffset, textOptions);
        doc.text('Valor', column5, tableTop + verticalOffset, textOptions);

        // Adicionar os dados das colunas com estilo
        doc.font('Times-Roman').fontSize(7);
        let y = tableTop + rowHeight;
        itensRelatorio.forEach((item, index) => {
            // Desenhar fundo branco para a linha
            doc.rect(column1, y, column6 - column1, rowHeight).fill('#ffffff');

            doc.font('Times-Roman').fontSize(7).fillColor('#000000').text(item.pat_nome, column1, y + verticalOffset, textOptions);
            doc.text(item.pat_data_aquisicao.toString(), column2, y + verticalOffset, textOptions);
            doc.text(item.pat_estado, column3, y + verticalOffset, textOptions);
            doc.text(item.pat_tipo, column4, y + verticalOffset, textOptions);
            doc.text(item.pat_valor, column5, y + verticalOffset, textOptions);

            // Desenhar linha inferior para separar cada item
            doc.moveTo(column1, y + rowHeight).lineTo(column6, y + rowHeight).stroke();

            y += rowHeight;
    });

// Cria o rodapé
    const imgx = (pageWidth - desiredImageWidth) / 2;
    const imgy = pageHeight - desiredImageHeight - 10;
    doc.image(imagePath, imgx, imgy, { width: desiredImageWidth, height: desiredImageHeight }).opacity(50);

     const chunks = [];
     let pdfBuffer;

     doc.on('data', (chunk) => {
        chunks.push(chunk);
     });

     doc.on('end', async () => {
        pdfBuffer = Buffer.concat(chunks);

        await Relatorio.create({
             rel_tipo: "Patrimônio",
             rel_responsavel_id: 1,
             rel_arquivo: pdfBuffer,
             createdAt: new Date()
        });
    });

    // Finalizar o documento
    doc.end();
};

//--------------------------------------------Gera o relatório de fornecedores--------------------------------------------
exports.GerarRelatorioFornecedores = async (req, res) => {
// Criar um novo documento PDF
    const doc = new PDFDocument();
    const forRelatorio = await Fornecedores.findAll();

// Configurar o cabeçalho para enviar um PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

// Canalizar o PDF diretamente para a resposta
    doc.pipe(res);

// Variáveis do cabeçalho
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentTime = new Date().toLocaleTimeString('pt-BR');
    const location = "Campo Grande, MS - Brasil";
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

// Variáveis do rodapé
    const imagePath = 'public/img/INVENTARIO-nobg.png';
    const desiredImageWidth = 66.6;
    const desiredImageHeight = 37.5;

// Cria o cabeçalho
    doc.font('Times-Roman').fontSize(10).text(`Data: ${currentDate}`, 0, 30, { align: 'center', width: pageWidth });
    doc.font('Times-Roman').fontSize(10).text(`Horário: ${currentTime}`, 0, 45, { align: 'center', width: pageWidth });
    doc.text(location, 0, 60, { align: 'center', width: pageWidth });

    doc.font('Times-Bold').fontSize(20).text('FORNECEDORES', 0, 100, { align: 'center', width: pageWidth });

// Configuração da tabela (tamanhos das colunas e posição)
    const tableTop = 130;
    const column1 = 100;
    const column2 = 200;
    const column3 = 300;
    const column4 = 400;
    const column5 = 500;
    const rowHeight = 15;
    const fontSize = 7;
    const verticalOffset = (rowHeight - fontSize) / 2;
    const textOptions = { width: column2 - column1, align: 'center' };


    doc.font('Times-Bold').fontSize(10).fillColor('#000000').text('Nome', column1, tableTop + verticalOffset, textOptions);
        doc.text('Email', column2, tableTop + verticalOffset, textOptions);
        doc.text('Telefone', column3, tableTop + verticalOffset, textOptions);
        doc.text('CNPJ', column4, tableTop + verticalOffset, textOptions);

        // Adicionar os dados das colunas com estilo
        doc.font('Times-Roman').fontSize(7);
        let y = tableTop + rowHeight;
        forRelatorio.forEach((fornecedor, index) => {
            // Desenhar fundo branco para a linha
            doc.rect(column1, y, column5 - column1, rowHeight).fill('#ffffff');

            doc.font('Times-Roman').fontSize(7).fillColor('#000000').text(fornecedor.for_nome, column1, y + verticalOffset, textOptions);
            doc.text(fornecedor.for_email, column2, y + verticalOffset, textOptions);
            doc.text(fornecedor.for_telefone.toString(), column3, y + verticalOffset, textOptions);
            doc.text(fornecedor.for_cnpj.toString(), column4, y + verticalOffset, textOptions);

            // Desenhar linha inferior para separar cada item
            doc.moveTo(column1, y + rowHeight).lineTo(column5, y + rowHeight).stroke();

            y += rowHeight;
    });

// Cria o rodapé
    const imgx = (pageWidth - desiredImageWidth) / 2;
    const imgy = pageHeight - desiredImageHeight - 10;
    doc.image(imagePath, imgx, imgy, { width: desiredImageWidth, height: desiredImageHeight }).opacity(50);

    const chunks = [];
    let pdfBuffer;

    doc.on('data', (chunk) => {
         chunks.push(chunk);
    });

    doc.on('end', async () => {
         pdfBuffer = Buffer.concat(chunks);

         await Relatorio.create({
            rel_tipo: "Fornecedor",
            rel_responsavel_id: 1,
            rel_arquivo: pdfBuffer,
            createdAt: new Date()
            });
        });

    // Finalizar o documento
    doc.end();
};
//--------------------------------------------Gera o relatório de localização--------------------------------------------
exports.GerarRelatorioLocalizacao = async (req, res) => {
// Criar um novo documento PDF
    const doc = new PDFDocument();
    const locRelatorio = await Localizacao.findAll();

// Configurar o cabeçalho para enviar um PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

// Canalizar o PDF diretamente para a resposta
    doc.pipe(res);

// Variáveis do cabeçalho
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentTime = new Date().toLocaleTimeString('pt-BR');
    const location = "Campo Grande, MS - Brasil";
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

// Variáveis do rodapé
    const imagePath = 'public/img/INVENTARIO-nobg.png';
    const desiredImageWidth = 66.6;
    const desiredImageHeight = 37.5;

// Cria o cabeçalho
    doc.font('Times-Roman').fontSize(10).text(`Data: ${currentDate}`, 0, 30, { align: 'center', width: pageWidth });
    doc.font('Times-Roman').fontSize(10).text(`Horário: ${currentTime}`, 0, 45, { align: 'center', width: pageWidth });
    doc.text(location, 0, 60, { align: 'center', width: pageWidth });

    doc.font('Times-Bold').fontSize(20).text('LOCALIZAÇÃO', 0, 100, { align: 'center', width: pageWidth });

// Configuração da tabela (tamanhos das colunas e posição)
    const tableTop = 130;
    const column1 = 80;
    const column2 = 230;
    const column3 = 400;
    const column4 = 550;
    const rowHeight = 15;
    const fontSize = 7;
    const verticalOffset = (rowHeight - fontSize) / 2;
    const textOptions = { width: column2 - column1, align: 'center' };


    doc.font('Times-Bold').fontSize(10).fillColor('#000000').text('Nome', column1, tableTop + verticalOffset, textOptions);
        doc.text('Responsável', column2, tableTop + verticalOffset, textOptions);
        doc.text('Descrição', column3, tableTop + verticalOffset, textOptions);

        // Adicionar os dados das colunas com estilo
        doc.font('Times-Roman').fontSize(7);
        let y = tableTop + rowHeight;
        locRelatorio.forEach((loc, index) => {
            // Desenhar fundo branco para a linha
            doc.rect(column1, y, column4 - column1, rowHeight).fill('#ffffff');

            doc.font('Times-Roman').fontSize(7).fillColor('#000000').text(loc.loc_nome, column1, y + verticalOffset, textOptions);
            doc.text(loc.loc_responsavel, column2, y + verticalOffset, textOptions);
            doc.text(loc.loc_descricao, column3, y + verticalOffset, textOptions);

            // Desenhar linha inferior para separar cada item
            doc.moveTo(column1, y + rowHeight).lineTo(column4, y + rowHeight).stroke();

            y += rowHeight;
    });

// Cria o rodapé
    const imgx = (pageWidth - desiredImageWidth) / 2;
    const imgy = pageHeight - desiredImageHeight - 10;
    doc.image(imagePath, imgx, imgy, { width: desiredImageWidth, height: desiredImageHeight }).opacity(50);

     const chunks = [];
     let pdfBuffer;

     doc.on('data', (chunk) => {
        chunks.push(chunk);
     });

     doc.on('end', async () => {
        pdfBuffer = Buffer.concat(chunks);

        await Relatorio.create({
             rel_tipo: "Localização",
             rel_responsavel_id: 1,
             rel_arquivo: pdfBuffer,
             createdAt: new Date()
        });
    });

    // Finalizar o documento
    doc.end();
};