const db = require("./db");

const Localizacao = db.sequelize.define('localizacao', {
        loc_id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        loc_nome: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        loc_descricao: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        loc_responsavel: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'localizacao'
    });

module.exports = Localizacao;
