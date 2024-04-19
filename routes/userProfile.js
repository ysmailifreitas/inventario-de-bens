const express = require('express');
const {Usuarios} = require('../models/Usuarios');
const router = express.Router();

router.get('/userProfile', async (req, res) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
    res.render('userProfile', {username: usuarioLogado});
});

module.exports = router;