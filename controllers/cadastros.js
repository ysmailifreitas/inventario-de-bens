const Localizacao = require("../models/Localizacao")
const Departamentos = require("../models/Departamentos")

exports.cadastrarLocalizacao = (req, res) => {
    Localizacao.create({
        loc_nome: req.body.localizacao,
        loc_descricao: req.body.descricao,
        loc_responsavel: req.body.responsavel
    }).then(function () {
        res.redirect('/home')
    })
}

exports.cadastrarDepartamento = (req, res) => {
    Departamentos.create({
        dep_nome: req.body.departamento,
        dep_descricao: req.body.descricao,
        dep_responsavel: req.body.responsavel
    }).then(function () {
        res.redirect('/home')
    })
}