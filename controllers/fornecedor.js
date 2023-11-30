const Fornecedor = require("../models/Fornecedor")

exports.cadastrarFornecedor = (req, res) => {
    Fornecedor.create({
        for_nome: req.body.nome,
        for_telefone: req.body.telefone,
        for_email: req.body.email
    }).then(function () {
        res.redirect('/fornecedores')
    })
}

exports.atualizarFornecedor = (req, res) => {
    Fornecedor.findOne({
        where: {id: req.params.id}
    }).then(function (fornecedor) {
        if (fornecedor) {
            fornecedor.update({
                for_nome: req.body.nome,
                for_telefone: req.body.telefone,
                for_email: req.body.email
            }).then(function () {
                res.redirect('/fornecedores')
            })
        }
    })
}

exports.deletarFornecedor = (req, res) => {
    Fornecedor.destroy({
        where: {id: req.params.id}
    }).then(function () {
        res.redirect(req.get('referer'));
    }).catch(function (erro) {
        res.send('fornecedor não deletado')
    })
}