const express = require('express');
const router = express.Router();
const {Usuarios} = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const CargoUsuario = require("../models/CargoUsuario");
const Cargos = require("../models/Cargos");

router.get("/cadastrarUsuario", (req, res) => {
    res.render("cadastrarUsuario");
});

router.post('/cadastrarUsuario', async (req, res) => {
    const { username, password, confirm_password, cargo } = req.body;
    try {
        const userExists = await Usuarios.findOne({ where: { usr_nome: username } });

        if (userExists) {
            return res.render('login', { errorMessage: 'Nome de usuário já está em uso. Por favor, escolha outro nome de usuário.' });
        }
        if (password !== confirm_password) {
            return res.render('cadastrarUsuario', { errorMessage: 'As senhas não coincidem. Por favor, tente novamente.' });
        }

        const cargoInfo = await Cargos.findOne({ where: { cargo_id: cargo } });
        if (!cargoInfo) {
            return res.render('cadastrarUsuario', { errorMessage: 'Cargo inválido. Por favor, escolha um cargo válido.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await Usuarios.create({
            usr_nome: username,
            usr_pass: hashedPassword,
            usr_cargo: cargoInfo.cargo_nome
        });

        await CargoUsuario.create({
            usr_id: usuario.usr_id,
            cargo_id: cargo
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.render('login', { errorMessage: 'Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde.' });
    }
});

module.exports = router;
