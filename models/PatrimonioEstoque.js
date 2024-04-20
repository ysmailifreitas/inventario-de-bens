const db = require("./db");
const Patrimonio = require("./Patrimonio");
const Estoque = require("./Estoque");

const PatrimonioEstoque = db.sequelize.define('patrimonio_estoque', {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'patrimonio_estoque',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

PatrimonioEstoque.belongsTo(Patrimonio, { foreignKey: 'pat_id' });
PatrimonioEstoque.belongsTo(Estoque, { foreignKey: 'estoque_id' });

module.exports = PatrimonioEstoque;