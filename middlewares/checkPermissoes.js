
const checkPermissions = (requiredPermission) => {
    return async (req, res, next) => {
        try {


        } catch (error) {
            console.error("Erro ao verificar permissões: ", error);
            res.status(500).send("Ocorreu um erro ao verificar suas permissões.");
        }
    };
};

module.exports = checkPermissions;
