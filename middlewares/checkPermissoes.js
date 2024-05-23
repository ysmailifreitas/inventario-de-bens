const { Usuarios } = require('../models/Usuarios');

const checkPermissions = (requiredRole) => {
    return async (req, res, next) => {
        try {
            let usuarioCargo = await Usuarios.findOne({ where: { usr_nome: req.session.username } }).then((usr) => usr.usr_cargo);

            if (requiredRole !== usuarioCargo) {
                res.status(403).send("O usuário logado não tem o cargo necessário. Cargo necessário: " + requiredRole);
            } else {
                next();
            }
        } catch (error) {
            console.error("Erro ao verificar permissões: ", error);
            res.status(500).send("Ocorreu um erro ao verificar suas permissões.");
        }
    };
};

module.exports = checkPermissions;