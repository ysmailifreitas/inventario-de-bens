const {Usuarios} = require("../models/Usuarios");
const Cargos = require("../models/Cargos");
const bcrypt = require("bcrypt");
const CargoUsuario = require("../models/CargoUsuario");

exports.getCadastroUsuarioForm = (req, res) => {
    res.render("cadastrarUsuario");
}

exports.getUsersListagem = async (req, res) => {
    try {
      const users = await Usuarios.findAll();
      const usuarioLogado = await Usuarios.findOne({ where: { usr_nome: req.session.username } });
      const user = users.filter(u => u.usr_nome !== usuarioLogado.usr_nome);
      res.render("usuarios", { user: user, username: usuarioLogado });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
};

exports.deletarUsuario = (req, res) => {
    Usuarios.destroy({
        where: {usr_id: req.params.id}
    }).then(function () {
        res.redirect(req.get('referer'));
    }).catch(function (erro) {
        res.send('Usuário não deletado')
    })
}

exports.cadastrarUsuario = async (req, res) => {
    const { username, password, confirm_password, cargo, user_email } = req.body;
    try {
        const userExists = await Usuarios.findOne({where: {usr_nome: username}});
        const usedEmail = await Usuarios.findOne({where: {usr_email: user_email}});

        if (usedEmail) {
            return res.render('cadastrarUsuario', {errorMessage: 'Email já está sendo utilizado. Escolha outro email para prosseguir'});

        }
        if (userExists) {
            return res.render('cadastrarUsuario', {errorMessage: 'Nome de usuário já está em uso. Por favor, escolha outro nome de usuário.'});
        }
        if (password !== confirm_password) {
            return res.render('cadastrarUsuario', {errorMessage: 'As senhas não coincidem. Por favor, tente novamente.'});
        }

        const cargoInfo = await Cargos.findOne({where: {cargo_id: cargo}});
        if (!cargoInfo) {
            return res.render('cadastrarUsuario', {errorMessage: 'Cargo inválido. Por favor, escolha um cargo válido.'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await Usuarios.create({
            usr_nome: username,
            usr_pass: hashedPassword,
            usr_cargo: cargoInfo.cargo_nome,
            usr_email: user_email
        });

        await CargoUsuario.create({
            usr_id: usuario.usr_id,
            cargo_id: cargo
        });

        res.redirect('/usuarios');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.render('login', {errorMessage: 'Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde.'});
    }
}