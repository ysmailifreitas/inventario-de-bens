const patrimonioService = require("../services/patrimonioService");

exports.getPatrimonioListagem = async (req, res) => {
    try {
        const {patrimonio, username} = await patrimonioService.getPatrimonioListagem(req.session.username);
        res.render("patrimonio/listagem/patrimonio", {patrimonio, username});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar os Patrimônios")
    }
};

exports.getVisualizacaoPatrimonio = async (req, res) => {
    try {
        const patId = req.params.id;
        const pat = await patrimonioService.getVisualizacaoPatrimonio(patId);
        if (pat) {
            console.log(pat)
            res.send(pat);
        } else {
            res.status(404).send("Patrimonio não encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o patrimonio.");
    }
}

exports.getCadastroPatrimonioForm = async (req, res) => {
    const {fornecedores, localizacao} = await patrimonioService.getCadastroPatrimonioForm()
    console.log({fornecedores, localizacao});
    res.render("patrimonio/cadastro/cadastroPatrimonio", {fornecedores, localizacao});
}

exports.getEdicaoPatrimonioForm = async (req, res) => {
    try {
        const pat = await patrimonioService.getEdicaoPatrimonioForm(req.params.id)
        res.render("patrimonio/edicao/editarPatrimonio", {patrimonio: pat, id: req.params.id});
    } catch (err) {
        console.error(err);
    }
}

exports.cadastrarPatrimonio = async (req, res) => {
    try {
        const {
            nome,
            tipo,
            data_aquisicao,
            preco,
            estadoConservacao,
            vida_util
        } = req.body;

        const quantidade = parseInt(req.body.quantidade);
        const precoFloat = parseFloat(preco);

        let mySelect = req.body["my-select"];
        let patrimonioDataSpread = {
            pat_for_id: mySelect,
            pat_nome: nome,
            pat_tipo: tipo,
            pat_data_aquisicao: data_aquisicao,
            pat_valor: precoFloat,
            pat_estado: estadoConservacao,
            pat_depreciacao_anual: 1,
            pat_vida_util: vida_util
        };

        await patrimonioService.criarPatrimonio(patrimonioDataSpread, req, quantidade, preco)

        res.redirect("/patrimonio");
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao cadastrar item!");
    }
};

exports.atualizarPatrimonio = (req, res) => {
    try {
        if (req.params.id) {
            const dadosObj = req.body
            patrimonioService.atualizarPatrimonio(req.params.id, dadosObj, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    setTimeout(() => {
                        res.redirect("/patrimonio");
                    }, 1000);
                }
            });
        }
    } catch (err) {
        res.status.send("Erro ao atualizar o Patrimonio")
    }
};

exports.deletarPatrimonio = (req, res) => {
    try{
        if (req.params.id) {
            patrimonioService.deletarPatrimonio(req.params.id, function(err){
                if (err){
                    console.error(err);
                } else{
                    setTimeout(() => {
                        res.redirect(req.get("referer"));
                    }, 1000);
                }
            })
        }
    }catch(err){
        res.status(500).send("Erro ao deletar o Patrimonio")
        console.error("Erro ao deletar o Patrimonio: ", err)
    }
};
