const Estoque = require("../models/Estoque");
const PatrimonioEstoque = require("../models/PatrimonioEstoque");
exports.atualizarEstoque = (req, res) => {
    Estoque.findOne({
        where: {estoque_id: req.params.id}
    }).then(function (estoque) {
        if (estoque) {
            estoque.update({
                estoque_loc_id: req.body.localizacao,
            }).then(function () {
                PatrimonioEstoque.findOne({where:{estoque_id: estoque.estoque_id}}).then(function (patrimonioEstoque) {
                    patrimonioEstoque.update({
                        quantidade: req.body.quantidade,
                    })
                })
            })
        }
    })
}