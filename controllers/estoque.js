const Estoque = require("../models/Estoque");
exports.atualizarEstoque = (req, res) => {
    Estoque.findOne({
        where: {estoque_id: req.params.id}
    }).then(function (estoque) {
        if (estoque) {
            estoque.update({
                estoque_loc_id: req.body.localizacao,
                estoque_qtde: req.body.quantidade,
            }).then(function () {

            })
        }
    })
}