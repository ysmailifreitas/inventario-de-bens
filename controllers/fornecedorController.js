const Fornecedor = require("../models/Fornecedores")
const {Usuarios} = require("../models/Usuarios");

// TODO IMPLEMENTAR A forgotPasswordService E REFATORAR A CONTROLLER PARA SOMENTE EXECUTAR A CONSULTA DA SERVICE

exports.getFornecedorListagem = (req, res) => {
    Fornecedor.findAll().then(async function (fornecedores) {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("fornecedores/listagem/fornecedores", {fornecedores: fornecedores, username: usuarioLogado});
    })
}

exports.getCadastroFornecedorForm = (req, res) => {
    res.render("fornecedores/cadastro/cadastroFornecedor");
}

exports.getEdicaoFornecedorForm = function (req, res) {
    Fornecedor.findOne({
        where: {for_id: req.params.id},
    }).then(async function (fornecedor) {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("fornecedores/edicao/editarFornecedor", {
            fornecedor: fornecedor,
            id: req.params.id,
            username: usuarioLogado
        });
    });
}

exports.cadastrarFornecedor = (req, res) => {
    Fornecedor.create({
        for_nome: req.body.nome,
        for_cnpj: req.body.cnpj,
        for_telefone: req.body.telefone,
        for_email: req.body.email
    }).then(function () {
        res.redirect('/fornecedores')
    })
}

exports.atualizarFornecedor = (req, res) => {
    Fornecedor.findOne({
        where: {for_id: req.params.id}
    }).then(function (fornecedor) {
        if (fornecedor) {
            fornecedor.update({
                for_nome: req.body.nome,
                for_cnpj: req.body.cnpj,
                for_telefone: req.body.telefone,
                for_email: req.body.email
            }).then(function () {

            })
        }
    })
}

exports.deletarFornecedor = (req, res) => {
    Fornecedor.destroy({
        where: {for_id: req.params.id}
    }).then(function () {
        res.redirect(req.get('referer'));
    }).catch(function (erro) {
        res.send('fornecedor não deletado')
    })
}