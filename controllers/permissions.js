const CargoUsuario= require("../models/CargoUsuario");
const {getUsuarioCargoNome, Usuarios} = require("../models/Usuarios");

exports.atualizarCargoUsuario = async (req, res) => {
    let novocargoNome;
    try {
        const usrId = req.params.id;
        const novoCargoId = req.body.cargo_id;
        const cargoUsuario = await CargoUsuario.findOne({where: {usr_id: usrId}});

        if (cargoUsuario) {
            await cargoUsuario.update({cargo_id: novoCargoId});

            novocargoNome = await getUsuarioCargoNome(novoCargoId)
            await Usuarios.update({usr_cargo: novocargoNome},{where:{usr_id:usrId}});
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
