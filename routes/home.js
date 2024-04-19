const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const {Usuarios} = require('../models/Usuarios');

router.use(checkAuth);

router.get("/home", async (req, res) => {
    try {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render("home", {
            username: usuarioLogado
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar os dados.");
    }
});

module.exports = router;
