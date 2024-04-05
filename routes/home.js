const express = require("express");
const router = express.Router();
const { Sequelize, Model, DataTypes } = require("sequelize");
const Itens = require("../models/Itens");
const DadosDashboard = require("../models/DadosDashboard");
const Fornecedor = require("../models/Fornecedor");
const Usuarios = require("../models/Users")
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get('/home', async (req, res) => {
  try {
    const total_itens = await Itens.count();
    const total_fornecedores = await Fornecedor.count();
    const total_usuarios = await Usuarios.count();
    const preco_total = await Itens.sum('it_valor_total');
    res.render('home', { total_usuarios, total_itens, total_fornecedores, preco_total });
  } catch (error) {
    console.error('Erro ao fazer contagens:', error);
    res.status(500).send('Erro ao fazer contagens');
  }
});

module.exports = router;
