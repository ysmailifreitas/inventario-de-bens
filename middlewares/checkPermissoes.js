const RoleAssignments = require('../models/RoleAssignmentss');

const checkPermissions = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            // Verifica se req.user existe e possui a propriedade 'userId'
            if (!req.session.userId) {
                return res.status(401).send('Usuário não autenticado');
            }

            const userId = req.session.userId;
            let requiredRoleId = 0;

            if(requiredPermission == 'adicionar_item'){
                requiredRoleId = 1;
            }else if(requiredPermission == 'editar_item'){
                requiredRoleId = 2;
            }else if(requiredPermission == 'excluir_item'){
                requiredRoleId = 3;
            }else if(requiredPermission == 'visualizar_item'){
                requiredRoleId = 4;
            }


            const RoleAssignments = await RoleAssignments.findOne({
                where: {
                    user_id: userId,
                    role_id: requiredRoleId,
                },
            });

            if (RoleAssignments) {
                // O usuário tem a permissão necessária, continue para a próxima middleware ou rota.
                next();
            } else {
                // O usuário não tem a permissão necessária, redirecione ou envie uma resposta de erro.
                res.status(403).send("Você não tem permissão para acessar este recurso.");
            }

        } catch (error) {
            console.error("Erro ao verificar permissões: ", error);
            res.status(500).send("Ocorreu um erro ao verificar suas permissões.");
        }
    };
};

module.exports = checkPermissions;
