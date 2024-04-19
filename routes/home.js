const express = require("express");
const router = express.Router();
const Patrimonio = require("../models/Patrimonio");
const DadosDashboard = require("../models/DadosDashboard");
const Fornecedor = require("../models/Fornecedores");
const {checkAuth} = require('../middlewares/auth');
const {Usuarios} = require('../models/Usuarios');

router.use(checkAuth);

router.get("/home", async (req, res) => {
    try {
        const itemComMaiorQuantidade = await Patrimonio.findOne({
            attributes: ["pat_id"],
            order: [["pat_nome", "DESC"]],
        });
        console.log(itemComMaiorQuantidade.id);

        if (!itemComMaiorQuantidade) {
            throw new Error("Nenhum item encontrado.");
        }

        const dadosDashboard = await DadosDashboard.findOne({
            attributes: [
                "valor_total",
                "depreciacao_anual",
                "taxa_depreciacao_anual",
                "taxa_utilizacao",
                "valor_liquido",
                "roi",
            ],
            where: {pat_id: itemComMaiorQuantidade.pat_id},
        });

        const [countPatrimonio, countFornecedores] = await Promise.all([
            Patrimonio.count(),
            Fornecedor.count(),
        ]);
        preco_unitario = itemComMaiorQuantidade.it_quantidade;
        console.log("preco" + preco_unitario);

        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("home", {
            username: usuarioLogado
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar os dados.");
    }
});

module.exports = router;
