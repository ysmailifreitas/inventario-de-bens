const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const RoleAssignments = require("../models/RoleAssignments");

router.get('/editarPermissoes', (req, res) => {
    Users.findAll().then((users) => {
        res.render('editarPermissoes', {
            users: users
        });
    });
});

router.get("/visualizarUsuario/:id", (req, res) => {
    const userId = req.params.id;
    Users.findOne({where: {id: userId}}).then(function (user) {
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

router.get("/usuario/:id", async function (req, res) {
    try {
        const user = await Users.findOne({where: {id: req.params.id}});
        const role = await RoleAssignments.findOne({where: {user_id: req.params.id}});

        const userRole = role ? role.role_id : null;

        let roleAtual = "";

        switch (userRole) {
            case 1:
                roleAtual = "Gestor (Atual)";
                break;
            case 2:
                roleAtual = "Administrador (Atual)";
                break;
            case 3:
                roleAtual = "Supervisor (Atual)";
                break;
            case 4:
                roleAtual = "Comum (Atual)";
                break;
        }

        res.render("editarPermissaoUsuario", {user: user, role_id: roleAtual});
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o Usuário e suas permissões.");
    }
});

router.post('/usuario/atualizarRole/:userId', async (req, res) => {
    const userId = req.params.userId;
    const roleId = req.body.role;

    try {
        const existingRoleAssignments = await RoleAssignments.findOne({
            where: {
                user_id: userId,
            },
        });

        if (existingRoleAssignments) {
            existingRoleAssignments.role_id = roleId;
            await existingRoleAssignments.save();
        } else {
            await RoleAssignments.create({
                user_id: userId,
                role_id: roleId,
            });
        }

        res.redirect(req.get('referer'));
    } catch (error) {
        console.error('Erro ao atualizar role:', error);
        res.status(500).send('Erro ao atualizar role.');
    }
});


module.exports = router;