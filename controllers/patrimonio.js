const Fornecedor = require("../models/Fornecedores");
const Patrimonio = require("../models/Patrimonio");
const Estoque = require("../models/Estoque");
const PatrimonioEstoque = require("../models/PatrimonioEstoque");
const Movimentacao = require("../models/Movimentacao");
const DadosDashboard = require("../models/DadosDashboard");
const calculadorItensService = require("../services/calculardorItensService");

exports.cadastrarPatrimonio = async (req, res) => {
    try {
        const selectElement = req.body["my-select"];
        fornecedor = await Fornecedor.findOne({where: {for_id: selectElement}});
        console.log(fornecedor);

        const quantidade = parseInt(req.body.quantidade);
        const preco = parseFloat(req.body.preco);

        const valorTotal = calculadorItensService.calcularValorTotal(
            quantidade,
            preco
        );
        const depreciacaoAnual = calculadorItensService.calcularDepreciacaoAnual(
            req.body.data_aquisicao
        );

        const taxaDepreciacaoAnual =
            calculadorItensService.calcularTaxaDepreciacaoAnual(
                depreciacaoAnual,
                1000
        );

        const patrimonio = await Patrimonio.create({
            pat_for_id: selectElement,
            pat_nome: req.body.nome,
            pat_tipo: req.body.tipo,
            pat_data_aquisicao: req.body.data_aquisicao,
            pat_valor: preco,
            pat_estado: req.body.estadoConservacao,
            pat_depreciacao_anual: depreciacaoAnual,
            pat_vida_util: req.body.vida_util
        });
        const estoque = await Estoque.create({
            estoque_loc_id: req.body.localizacao,
        });
        await PatrimonioEstoque.create({
            quantidade: req.body.quantidade,
            pat_id: req.body.pat_id,
            estoque_id: estoque.estoque_id,
        });

        await Movimentacao.create({
            mov_pat_id: patrimonio.pat_id,
            mov_loc_origem_id: req.body.localizacao,
            mov_loc_destino_id: req.body.localizacao,
            mov_responsavel: req.session.username,
            mov_tipo: 'Entrada'
        })

        await DadosDashboard.create({
            valor_total: valorTotal,
            depreciacao_anual: depreciacaoAnual,
            taxa_depreciacao_anual: taxaDepreciacaoAnual,
            taxa_utilizacao: 1,
            valor_liquido: 1,
            roi: 1,
            pat_id: patrimonio.pat_id,
        });

        res.redirect("/patrimonio");
      
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao cadastrar item!");
    }
};

exports.atualizarPatrimonio = (req, res) => {
    console.log("Received update request for item ID:", req.params.id);
    Patrimonio.findOne({
        where: {pat_id: req.params.id},
    })
        .then(function (item) {
            if (item) {
                console.log("Patrimonio found:", item);
                item
                    .update({
                        pat_nome: req.body.nome,
                        pat_vida_util: req.body.vida_util,
                        pat_data_aquisicao: req.body.data_aquisicao
                    })
                    .then(function () {
                        console.log("Patrimonio updated successfully");
                        // res.redirect("/patrimonio");
                    })
                    .catch(function (error) {
                        console.error("Error updating item:", error);
                    });
            } else {
                console.log("Patrimonio with ID", req.params.id, "not found");
            }
        })
        .catch(function (error) {
            console.error("Error finding item:", error);
        });
};

exports.deletarPatrimonio = (req, res) => {
    DadosDashboard.destroy({
        where: {pat_id: req.params.id},
    })
    Patrimonio.destroy({
        where: {pat_id: req.params.id},
    })
        .then(function () {
            setTimeout(() => {
                res.redirect(req.get("referer"));
            }, 1000);
        })
        .catch(function (erro) {
            res.send("patrimonio não deletado");
        });
};
