const {Usuarios} = require("../models/Usuarios");
const Relatorio = require("../models/Relatorio");

exports.getRelatoriosListagem = async (req, res) => {
    const relatorio = await Relatorio.findAll({
         include: [{
         model: Usuarios,
         as: 'usuario',
         attributes: ['usr_nome']
         }]
    }).then((relatorios) => relatorios)
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render("relatorio", {relatorio: relatorio, username: usuarioLogado});
}

exports.getRelatorioDownload = async (req, res) => {
    try {
        const relatorio = await Relatorio.findByPk(req.params.id);
        if (!relatorio) {
            return res.status(404).send('Relatório não encontrado');
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
        res.send(relatorio.rel_arquivo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao recuperar o relatório');
    }
}

exports.deletarRelatorio = (req, res) => {
    Relatorio.destroy({
        where: {rel_id: req.params.id}
    }).then(function () {
        res.redirect(req.get('referer'));
    }).catch(function (erro) {
        res.send('Relatório não deletado')
    })
}