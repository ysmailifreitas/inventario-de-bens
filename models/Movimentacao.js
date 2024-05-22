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
        mov_responsavel: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        mov_tipo: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        mov_motivo: {
            type: db.Sequelize.STRING,
            allowNull: true,
            unique: false
        }
    },
    {
        tableName: 'movimentacao',
        createdAt: true,
        updatedAt: true
    });

Movimentacao.belongsTo(Patrimonio, { foreignKey: 'mov_pat_id', as: 'patrimonio' });
Movimentacao.belongsTo(Localizacao, { foreignKey: 'mov_loc_origem_id', as: 'Origem' });
Movimentacao.belongsTo(Localizacao, { foreignKey: 'mov_loc_destino_id', as: 'Destino' });

module.exports = Movimentacao;