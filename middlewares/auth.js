const checkAuth = (req, res, next) => {
    const currentPath = req.path;

    if (currentPath === "/cadastrarUsuario") {
        next();
    } else {
        if (req.session.username) {
            res.locals.user = { username: req.session.username };
            next();
        } else {
            res.redirect("/login");

            // Descomente as linhas seguinte e comente a anterior para não precisar logar toda hora quando for desenvolver

            // req.session.username = 'admin'
            // res.locals.user = { username: req.session.username };
            //
            // next();

        }
    }
};

module.exports = {
    checkAuth
};