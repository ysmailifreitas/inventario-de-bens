const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Permissoes = require('../models/Permissoes');
const bcrypt = require('bcrypt');

router.get("/cadastrarUsuario", (req, res) => {
  res.render("cadastrarUsuario");
});

router.post('/cadastrarUsuario', async (req, res) => {
  const { username, password, company_email, company_name, cnpj, address, fullname, tipo_permissao } = req.body;

  try {
    const userExists = await User.findOne({ where: { username: username } });

    if (userExists) {
      res.render('login', { errorMessage: 'Nome de usuário já está em uso. Por favor, escolha outro nome de usuário.' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username: username,
        password: hashedPassword,
        company_email: company_email,
        company_name: company_name,
        cnpj: cnpj,
        address: address,
        fullname: fullname,
        tipo_permissao: tipo_permissao.toString() // Convertemos para string aqui
      });

      await Permissoes.create({
        tipoUsuario: username,
        permissoes: JSON.stringify(tipo_permissao) // Convertemos o objeto para JSON aqui
      });

      res.redirect('/login');
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.render('login', { errorMessage: 'Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde.' });
  }
});


module.exports = router;
