const db = require("./db");
const Patrimonio = require("./Patrimonio");
const Localizacao = require("./Localizacao");

const Estoque = db.sequelize.define('estoque', {
        estoque_id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estoque_pat_id: {
            type: db.Sequelize.INTEGER,
            references: {
                model: Patrimonio,
                key: 'pat_id'
            }
        },
        estoque_loc_id: {
            type: db.Sequelize.INTEGER,
            references: {
                model: Localizacao,
                key: 'loc_id'
            }
        },
        estoque_qtde: {
            type: db.Sequelize.INTEGER,
            allowNull: true
        },
    },
    {
        tableName: 'estoque',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

module.exports = Estoque;
