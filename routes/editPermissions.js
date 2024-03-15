const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Roles = require('../models/Roles.js');
const Permissions = require('../models/Permissions')
const UserRoles = require('../models/UserRoles')
const {where} = require("sequelize");
const permissionsController = require("../controllers/permissions");


router.get('/editPermissions', (req, res) => {
    Users.findAll().then((users) => {
        res.render('editarPermissoes', {
            users: users
        });
    });
});

router.get("/visualizarUsuario/:id", (req, res) => {
    const userId = req.params.id;
    Users.findOne({where: {user_id: userId}}).then(function (user) {
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

router.post("/editPermissions/updateUserRole/:id", permissionsController.atualizarUserRole);

module.exports = router;