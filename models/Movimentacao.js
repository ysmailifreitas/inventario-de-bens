const db = require("./db");
const Patrimonio = require("./Patrimonio");
const Localizacao = require("./Localizacao");

const Movimentacao = db.sequelize.define('movimentacao', {
        mov_id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mov_pat_id: {
            type: db.Sequelize.INTEGER,
            references: {
                model: Patrimonio,
                key: 'pat_id'
            }
        },
        mov_loc_origem_id: {
            type: db.Sequelize.INTEGER,
            references: {
                model: Localizacao,
                key: 'loc_id'
            }
        },
        mov_loc_destino_id: {
            type: db.Sequelize.INTEGER,
            references: {
                model: Localizacao,
                key: 'loc_id'
            }
        },
        mov_responsavel: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        mov_tipo: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'movimentacao',
        createdAt: true,
        updatedAt: true
    });

module.exports = Movimentacao;
