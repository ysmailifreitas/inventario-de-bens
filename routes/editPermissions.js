const express = require('express');
const router = express.Router();
const Roles = require('../models/Cargos.js');
const Permissions = require('../models/Permissoes')
const UserRoles = require('../models/CargoUsuario')
const {where} = require("sequelize");
const permissionsController = require("../controllers/permissions");
const {Usuarios} = require('../models/Usuarios');


router.get('/editPermissions', (req, res) => {
    Usuarios.findAll().then(async (users) => {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: req.session.username}});
        res.render('editarPermissoes', {
            users: users, username: usuarioLogado
        });
    });
});

router.get("/visualizarUsuario/:id", (req, res) => {
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
});

router.post("/editPermissions/atualizarCargoUsuario/:id", permissionsController.atualizarCargoUsuario);

module.exports = router;