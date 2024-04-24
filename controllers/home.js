const {Usuarios} = require("../models/Usuarios");

exports.getHomePage = async (req, res) => {
    try {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("home", {
            username: usuarioLogado
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar os dados.");
    }
}