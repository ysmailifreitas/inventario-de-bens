const Fornecedor = require("../models/Fornecedor");
const Itens = require("../models/Itens");
const DadosDashboard = require("../models/DadosDashboard");
const calculadorItensService = require("../services/calculardorItensService");

exports.cadastrarItem = async (req, res) => {
    try {
        const selectElement = req.body["my-select"];
        fornecedor = await Fornecedor.findOne({where: {id: selectElement}});
        console.log(fornecedor.for_nome);

        const quantidade = parseInt(req.body.quantidade);
        const precoUnitario = parseFloat(req.body.preco_unitario);

        const valorTotal = calculadorItensService.calcularValorTotal(
            quantidade,
            precoUnitario
        );
        const depreciacaoAnual = calculadorItensService.calcularDepreciacaoAnual(
            req.body.data_aquisicao
        );
        const anosDecorridos = calculadorItensService.calcularAnosDecorridos(
            req.body.data_aquisicao
        );
        const valorCompra = req.body.valorCompra;
        const taxaDepreciacaoAnual =
            calculadorItensService.calcularTaxaDepreciacaoAnual(
                depreciacaoAnual,
                valorCompra
            );
        const taxaUtilizacao = calculadorItensService.calcularTaxaUtilizacao(
            req.body.quantidadeEmUso,
            req.body.quantidadeTotal
        );
        const valorLiquido = calculadorItensService.calcularValorLiquido(
            valorCompra,
            depreciacaoAnual,
            anosDecorridos
        );
        const roi = calculadorItensService.calcularROI(
            valorCompra,
            req.body.valorVenda,
            anosDecorridos
        );

        const item = await Itens.create({
            for_id: selectElement,
            it_for_nome: req.body.for_nome,
            it_nome: req.body.nome,
            it_quantidade: quantidade,
            it_dataAquisicao: req.body.data_aquisicao,
            it_preco_unitario: precoUnitario,
            it_valor_total: valorTotal,
            it_depreciacao_anual: depreciacaoAnual,
            it_categoria: req.body.categoria,
            it_descricao: req.body.descricao,
            it_localizacao: req.body.localizacao,
            it_data_aquisicao: req.body.dataAquisicao,
            it_valor_compra: valorCompra,
            it_valor_venda: req.body.valorVenda,
            it_estado_conservacao: req.body.estadoConservacao,
            it_responsavel: req.body.responsavel,
        });

        await DadosDashboard.create({
            valor_total: valorTotal,
            depreciacao_anual: depreciacaoAnual,
            taxa_depreciacao_anual: taxaDepreciacaoAnual,
            taxa_utilizacao: taxaUtilizacao,
            valor_liquido: valorLiquido,
            roi: roi,
            item_id: item.id,
        });

        res.redirect("/itens");
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao cadastrar item!");
    }
};

exports.atualizarItem = (req, res) => {
    Itens.findOne({
        where: {id: req.params.id},
    }).then(function (item) {
        if (item) {
            item
                .update({
                    it_nome: req.body.descricao,
                    it_quantidade: req.body.quantidade,
                    it_dataAquisicao: req.body.data_aquisicao,
                    for_id: req.body.fornecedores,
                })
                .then(function () {
                    res.redirect("/itens");
                });
        }
    });
};

exports.deletarItem = (req, res) => {
    Itens.destroy({
        where: {id: req.params.id},
    })
        .then(function () {
            res.redirect(req.get("referer"));
        })
        .catch(function (erro) {
            res.send("item não deletado");
        });
};
