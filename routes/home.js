const express = require("express");
const router = express.Router();
const Itens = require("../models/Itens");
const DadosDashboard = require("../models/DadosDashboard");
const Fornecedor = require("../models/Fornecedor");
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/home", async (req, res) => {
    try {
        const itemComMaiorQuantidade = await Itens.findOne({
            attributes: ["id"],
            order: [["it_quantidade", "DESC"]],
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
            where: {item_id: itemComMaiorQuantidade.id},
        });

        const [countItens, countFornecedores] = await Promise.all([
            Itens.count(),
            Fornecedor.count(),
        ]);
        preco_unitario = itemComMaiorQuantidade.it_quantidade;
        console.log("preco" + preco_unitario);

        res.render("home", {
            countItens: countItens,
            countFornecedores: countFornecedores,
            itemComMaiorQuantidade: itemComMaiorQuantidade,
            dadosDashboard: dadosDashboard,
            preco_unitario: preco_unitario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar os dados.");
    }
});

module.exports = router;
