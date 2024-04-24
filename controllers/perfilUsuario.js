const {Usuarios} = require("../models/Usuarios");

exports.getPerfilUsuarioPage = async (req, res) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render('userProfile', {username: usuarioLogado});
}