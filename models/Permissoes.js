const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Permissoes = db.sequelize.define('permissoes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  tipoUsuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissoes: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

Permissoes.sync().then(() => {
  console.log('Tabela de permissões sincronizada com o banco de dados.');
}).catch((error) => {
  console.error('Erro ao sincronizar tabela de permissões:', error);
});

module.exports = Permissoes;
