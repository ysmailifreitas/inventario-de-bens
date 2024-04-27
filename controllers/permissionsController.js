const CargoUsuario = require("../models/CargoUsuario");
const {getUsuarioCargoNome, Usuarios} = require("../models/Usuarios");
const Permissoes = require("../models/Permissoes");
const Cargos = require("../models/Cargos");

exports.getEditarPermissoes = (req, res) => {
    Usuarios.findAll().then(async (users) => {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        let permissoes = await Permissoes.findAll().then((permissoes) => permissoes)
        let cargos = await Cargos.findAll().then((cargos) => cargos)
        res.render('editarPermissoes', {
            users: users, username: usuarioLogado, permissoes: permissoes, cargos: cargos
        });
    });
}

exports.getVisualizarUsuario = (req, res) => {
    const userId = req.params.id;
    Usuarios.findOne({where: {user_id: userId}}).then(function (user) {
        if (user) {
            res.send(user);

        } else {
            res.status(404).send("Usuário não encontrado");
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o Usuário.");
    });
}

exports.atualizarCargoUsuario = async (req, res) => {
    let novocargoNome;
    try {
        const usrId = req.params.id;
        const novoCargoId = req.body.cargo_id;
        const cargoUsuario = await CargoUsuario.findOne({where: {usr_id: usrId}});

        if (cargoUsuario) {
            await cargoUsuario.update({cargo_id: novoCargoId});

            novocargoNome = await getUsuarioCargoNome(novoCargoId)
            await Usuarios.update({usr_cargo: novocargoNome}, {where: {usr_id: usrId}});
            console.log('Depois da atualização:', usrId, novoCargoId);

            res.redirect(req.get('referer'));
        } else {
            res.status(404).send('Cargo do usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao atualizar cargo do usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
};
