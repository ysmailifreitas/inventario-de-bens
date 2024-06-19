const PDFDocument = require('pdfkit');
const Itens = require("../models/Patrimonio");
const Fornecedores = require("../models/Fornecedores");
const {Usuarios} = require("../models/Usuarios")
const Localizacao = require("../models/Localizacao");
const Relatorio = require("../models/Relatorio");

exports.getDataRelatorio = async (req, res) => {
       try{
       const { value } = req.body;
               let columnHeaders, relatorioTipo, dataFound, espacamento, initialColumn

               if (value === "0" ) {
                   return res.status(400).json({ error: "Selecione uma opção" });
               } else if (value === "pat") {
               dataRelatorio = await Itens.findAll();
               columnHeaders = ['Nome', 'Data Aquisição', 'Estado', "Tipo", "Valor"];
               relatorioTipo = "Patrimonio";
               dataFound = dataRelatorio.map(item => [
                   item.pat_nome,
                   item.pat_data_aquisicao.toString(),
                   item.pat_estado,
                   item.pat_tipo,
                   item.pat_valor
               ]);
               espacamento = 100;
               initialColumn = 50;
               console.log(dataRelatorio)
               } else if (value === "forn") {
               dataRelatorio = await Fornecedores.findAll()
               columnHeaders = ['Nome', 'Email', 'Telefone', "CNPJ"];
               relatorioTipo = "Fornecedores"
               dataFound = dataRelatorio.map(fornecedor => [
                   fornecedor.for_nome,
                   fornecedor.for_email,
                   fornecedor.for_telefone.toString(),
                   fornecedor.for_cnpj.toString()
               ]);
               espacamento = 100;
               initialColumn = 100;

               } else if (value == "loc" ){
               dataRelatorio = await Localizacao.findAll()
               columnHeaders = ['Nome', 'Responsável', 'Descrição'];
               relatorioTipo = "Localização"
               dataFound = dataRelatorio.map(loc => [
                       loc.loc_nome,
                       loc.loc_responsavel,
                       loc.loc_descricao,
                   ]);
               espacamento = 150;
               initialColumn = 80;
       }

// Criar um novo documento PDF
    const doc = new PDFDocument();

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

    doc.font('Times-Bold').fontSize(20).text(relatorioTipo.toUpperCase(), 0, 100, { align: 'center', width: pageWidth });

// Configuração da tabela (tamanhos das colunas e posição)
    const tableTop = 130;
    const rowHeight = 15;
    const fontSize = 7;
    const verticalOffset = (rowHeight - fontSize) / 2;
    const textOptions = { width: (initialColumn + espacamento) - initialColumn, align: 'center' };

// Cria as colunas dinamicamente
    doc.font('Times-Bold')
    .fontSize(10)
    .fillColor('#000000');
    columnHeaders.forEach((columnHeaders, columnIndex) => {
         const columnPosition = initialColumn + ( columnIndex * espacamento );

         doc.text(columnHeaders, columnPosition, tableTop + verticalOffset, textOptions);
         columnIndex++
    })

// Adicionar os dados das colunas com estilo
        let y = tableTop + rowHeight;
        dataFound.forEach((dataRows, index) => {
            doc.font('Times-Roman').fontSize(7).fillColor('#000000');

            dataRows.forEach((data, index) => {
                let columnPosition = initialColumn + ( index * espacamento )
                doc.text(data, columnPosition, y + verticalOffset, textOptions)
                index++
            })

            doc.moveTo(50, y + rowHeight).lineTo(550, y + rowHeight).stroke();

            y += rowHeight;
    });

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

        let user = await Usuarios.findOne({where: {usr_nome: req.session.username}});

        await Relatorio.create({
             rel_tipo: relatorioTipo,
             rel_responsavel_id: user.usr_id,
             rel_arquivo: pdfBuffer,
             createdAt: new Date()
        });

    });

    // Finalizar o documento
    doc.end()
    } catch(error) {
       console.error("Erro ao gerar relatório", error)
    }

}