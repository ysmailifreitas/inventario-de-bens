const Movimentacao = require("../models/Movimentacao");
const {Usuarios} = require("../models/Usuarios");

exports.getMovimentacaoListagem = async (req, res) => {
    const movimentacao = await Movimentacao.findAll().then((movimentacao) => movimentacao)
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render("movimentacoes", {movimentacao: movimentacao, username: usuarioLogado});
}