const Localizacao = require("../models/Localizacao");
const Fornecedor = require("../models/Fornecedores");
const Patrimonio = require("../models/Patrimonio");
const Estoque = require("../models/Estoque");
const PatrimonioEstoque = require("../models/PatrimonioEstoque");
const Movimentacao = require("../models/Movimentacao");
const DadosDashboard = require("../models/DadosDashboard");
const calculadorItensService = require("../services/calculardorItensService");
const {Usuarios} = require("../models/Usuarios");

exports.getPatrimonioListagem = async (req, res) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    const patrimonio = await Patrimonio.findAll({
        include: [{
            model: Fornecedor,
            as: 'fornecedor',
            attributes: ['for_nome']
        }]
    });
    res.render("patrimonio/listagem/patrimonio", {patrimonio: patrimonio, username: usuarioLogado});
};

exports.getVisualizacaoPatrimonio = (req, res) => {
    const patId = req.params.id;
    Patrimonio.findOne({where: {pat_id: patId}}).then(function (pat) {
        if (pat) {
            res.send(pat);
        } else {
            res.status(404).send("Patrimonio não encontrado");
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o patrimonio.");
    });
}

exports.getCadastroPatrimonioForm = async (req, res) => {
    let fornecedores = await Fornecedor.findAll().then((fornecedores) => fornecedores);
    let localizacao = await Localizacao.findAll().then((localizacao) => localizacao);
    console.log(localizacao)
    res.render("patrimonio/cadastro/cadastroPatrimonio", {fornecedores: fornecedores, localizacao: localizacao});
}

exports.getEdicaoPatrimonioForm = function (req, res) {
    Patrimonio.findOne({
        where: {pat_id: req.params.id},
    }).then(function (pat) {
        res.render("patrimonio/edicao/editarPatrimonio", {patrimonio: pat, id: req.params.id});
    });
}

exports.cadastrarPatrimonio = async (req, res) => {
    try {
        const selectElement = req.body["my-select"];

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
            pat_valor: req.body.preco,
            pat_estado: req.body.estadoConservacao,
            pat_depreciacao_anual: depreciacaoAnual,
            pat_vida_util: req.body.vida_util
        });
        const estoque = await Estoque.create({
            estoque_loc_id: req.body.localizacao,
        });
        await PatrimonioEstoque.create({
            quantidade: req.body.quantidade,
            pat_id: patrimonio.pat_id,
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

exports.atualizarPatrimonio = (req) => {
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
        .catch(function (err) {
            res.send("patrimonio não deletado", err);
        });
};
