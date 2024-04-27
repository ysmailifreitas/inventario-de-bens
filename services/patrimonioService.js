const Localizacao = require("../models/Localizacao");
const Fornecedor = require("../models/Fornecedores");
const Patrimonio = require("../models/Patrimonio");
const Estoque = require("../models/Estoque");
const PatrimonioEstoque = require("../models/PatrimonioEstoque");
const Movimentacao = require("../models/Movimentacao");
const DadosDashboard = require("../models/DadosDashboard");
const {Usuarios} = require("../models/Usuarios");
const calculoPatrimonioService = require("./calculoPatrimonioService");

exports.getPatrimonioListagem = async (username) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: username}});
    const patrimonio = await Patrimonio.findAll({
        include: [{
            model: Fornecedor,
            as: 'fornecedor',
            attributes: ['for_nome']
        }]
    });
    return {patrimonio: patrimonio, username: usuarioLogado};
};

exports.getVisualizacaoPatrimonio = (patId) => {
    let pat = Patrimonio.findOne({where: {pat_id: patId}})
    return pat
}

exports.getCadastroPatrimonioForm = async() => {
    let fornecedores = await Fornecedor.findAll().then((fornecedores) => fornecedores);
    let localizacao = await Localizacao.findAll().then((localizacao) => localizacao);
    return {fornecedores: fornecedores, localizacao: localizacao};
}

exports.getEdicaoPatrimonioForm = function (patId) {
    return Patrimonio.findOne({
        where: {pat_id: patId},
    }).then((pat) => pat);
}

exports.criarPatrimonio = async function (spreadElements, req, quantidade, preco) {
    const valorTotal = calculoPatrimonioService.calcularValorTotal(
        quantidade,
        preco
    );
    console.log('valorTotal', valorTotal);

    const depreciacaoAnual = calculoPatrimonioService.calcularDepreciacaoAnual(
        spreadElements.pat_data_aquisicao
    );
    console.log('depreciacaoAnual', depreciacaoAnual);

    const taxaDepreciacaoAnual =
        calculoPatrimonioService.calcularTaxaDepreciacaoAnual(
            depreciacaoAnual,
            1000
        );
    console.log('taxaDepreciacaoAnual', taxaDepreciacaoAnual);


    const patrimonio = await Patrimonio.create({
        ...spreadElements
    });
    const estoque = await Estoque.create({
        estoque_loc_id: req.body.localizacao,
    });
    await PatrimonioEstoque.create({
        quantidade: quantidade,
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
}

exports.atualizarPatrimonio = (patId, dadosObj, callback) => {
    Patrimonio.findOne({
        where: {pat_id: patId},
    })
        .then(function (item) {
            if (item) {
                item
                    .update({
                        pat_nome: dadosObj.nome,
                        pat_vida_util: dadosObj.vida_util,
                        pat_data_aquisicao: dadosObj.data_aquisicao
                    })
                    .then(function () {
                        console.log("Patrimonio updated successfully");
                        callback(null);
                    })
                    .catch(function (error) {
                        console.error("Error updating item:", error);
                        callback(error);
                    });
            } else {
                console.log("Patrimonio with ID", patId, "not found");
            }
        })
        .catch(function (error) {
            console.error("Error finding item:", error);
        });
};

exports.deletarPatrimonio = (patId, callback) => {
    DadosDashboard.destroy({
        where: {pat_id: patId},
    })
    Patrimonio.destroy({
        where: {pat_id: patId},
    })
        .then(function () {
            callback(null);
        })
        .catch(function (err) {
            console.error("patrimonio não deletado", err);
            callback(err);
        });
};
