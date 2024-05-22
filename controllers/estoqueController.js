const Estoque = require("../models/Estoque");
const PatrimonioEstoque = require("../models/PatrimonioEstoque");
const {Usuarios} = require("../models/Usuarios");
const Localizacao = require("../models/Localizacao");

// TODO IMPLEMENTAR A estoqueService E REFATORAR A CONTROLLER PARA SOMENTE EXECUTAR A CONSULTA DA SERVICE

exports.getEstoqueListagem = async (req, res) => {
    try {
        const usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        const estoques = await Estoque.findAll();

        const consultas = await Promise.all(estoques.map(async (estoque) => {
            const estoqueComLocalizacao = await Estoque.findOne({
                where: {estoque_id: estoque.estoque_id},
                include: [{
                    model: Localizacao,
                    as: 'localizacao',
                    required: true,
                    attributes: ['loc_nome']
                }]
            });

            const patrimonio_estoque = await PatrimonioEstoque.findOne({where: estoqueComLocalizacao.estoque_id});

            const loc_nome = estoqueComLocalizacao && estoqueComLocalizacao.localizacao ? estoqueComLocalizacao.localizacao.loc_nome : null;

            return {
                estoque_id: estoque.estoque_id,
                loc_nome: loc_nome,
                pat_id: patrimonio_estoque.pat_id,
                quantidade: patrimonio_estoque.quantidade
            };
        }));

        console.log('consultas: ', consultas);
        res.render("estoque/listagem/estoque", {estoque: consultas, username: usuarioLogado});
    } catch (error) {
        console.error("Erro ao buscar dados de estoque com localização:", error);
        res.status(500).send("Erro ao buscar dados de estoque com localização");
    }
};




exports.getEdicaoEstoqueForm = async (req, res) => {
    const estoque = await Estoque.findOne({where: {estoque_id: req.params.id}});
    const patrimonio_estoque = await PatrimonioEstoque.findOne({where: {estoque_id: estoque.estoque_id}});

    const estoqueComPatrimonioEstoque = {
        estoque_id: estoque.estoque_id,
        pat_id: patrimonio_estoque.pat_id,
        loc_id: estoque.estoque_loc_id,
        quantidade: patrimonio_estoque.quantidade
    };
    console.log(estoqueComPatrimonioEstoque)
    res.render("estoque/edicao/editarEstoque", {
        estoque: estoqueComPatrimonioEstoque,
        estoque_id: req.params.id
    });
}

exports.atualizarEstoque = (req, res) => {
    Estoque.findOne({
        where: {estoque_id: req.params.id}
    }).then(function (estoque) {
        if (estoque) {
            estoque.update({
                estoque_loc_id: req.body.localizacao,
            }).then(function () {
                PatrimonioEstoque.findOne({where: {estoque_id: estoque.estoque_id}}).then(function (patrimonioEstoque) {
                    patrimonioEstoque.update({
                        quantidade: req.body.quantidade,
                    })
                })
            })
        }
    })
}