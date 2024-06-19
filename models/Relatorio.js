const { DataTypes } = require('sequelize');
const db = require("./db");
const {Usuarios} = require("./Usuarios");

const Relatorio = db.sequelize.define('relatorio', {
    rel_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rel_tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      rel_responsavel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Usuarios,
          key: 'usr_id',
        },
      },
      rel_arquivo: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
        tableName: 'relatorio'
    });

Relatorio.belongsTo(Usuarios, { foreignKey: 'rel_responsavel_id' });

module.exports = Relatorio;