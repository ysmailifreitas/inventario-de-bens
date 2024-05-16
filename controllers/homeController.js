const Itens = require("../models/Patrimonio");
const Fornecedor = require("../models/Fornecedores");
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

exports.getHomeData = async (req, res) => {
    try {
        const total_itens = await Itens.count();
        const total_fornecedores = await Fornecedor.count();
        const total_usuarios = await Usuarios.count();
        const preco = await Itens.sum('pat_valor');
        const preco_total = preco.toFixed(2);
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});

        res.render('home', {total_usuarios, total_itens, total_fornecedores, preco_total, username: usuarioLogado});
    } catch (error) {
        console.error('Erro ao fazer contagens:', error);
        res.status(500).send('Erro ao fazer contagens');
    }

    // Itens.findAll().then(function (itens) {
    //         res.render("home", {itens, username: req.session.username});
    //     });
};