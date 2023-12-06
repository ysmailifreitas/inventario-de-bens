const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    const currentPath = req.path;

    if (currentPath === "/cadastrarUsuario") {
        next();
    } else {
        if (req.session.username) {
            next();
        } else {
            res.redirect("/login");
        }
    }
};

module.exports = {
    checkAuth
};
