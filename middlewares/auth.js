const checkAuth = (req, res, next) => {
    const currentPath = req.path;

    if (currentPath === "/cadastrarUsuario") {
        // Se o caminho for "/cadastrarUsuario", permita o acesso sem autenticação
        next();
    } else {
        // Verifica se o usuário está autenticado
        if (req.session.username) {
            // Adiciona o nome de usuário à resposta para estar disponível nas views
            res.locals.user = { username: req.session.username };
            next();
        } else {
            // Redireciona para a página de login se o usuário não estiver autenticado
            res.redirect("/login");
        }
    }
};

module.exports = {
    checkAuth
};
