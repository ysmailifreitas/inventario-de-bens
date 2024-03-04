const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const UserRoles = require('../models/UserRoles.js');

router.get('/editarPermissoes', (req, res) => {
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

router.get("/editPermission/usuario/:id", async function (req, res) {
    try {
        const user = await Users.findOne({where: {user_id: req.params.id}});
        const role = await UserRoles.findOne({where: {user_id: req.params.id}});

        const userRole = role ? role.role_id : null;

        res.render("editarPermissaoUsuario", {user: user, role_id: userRole});
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o Usuário e suas permissões.");
    }
});

router.post('/usuario/atualizarRole/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {

        res.redirect(req.get('referer'));
    } catch (error) {
        console.error('Erro ao atualizar role:', error);
        res.status(500).send('Erro ao atualizar role.');
    }
});


module.exports = router;