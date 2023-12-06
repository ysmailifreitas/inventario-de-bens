const User = require('../models/Users');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ where: { username: username } });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = username;
            res.render('home');
        } else {
            res.render('login', { errorMessage: 'Credenciais inválidas. Verifique seu nome de usuário e senha e tente novamente.' });
        }
    } catch (error) {
        console.error('Erro ao encontrar usuário:', error);
        res.render('login', { errorMessage: 'Ocorreu um erro durante o login. Tente novamente mais tarde.' });
    }
};
