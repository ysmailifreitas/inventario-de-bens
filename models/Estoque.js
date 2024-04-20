const db = require("./db");
const Localizacao = require("./Localizacao");

const Estoque = db.sequelize.define('estoque', {
        estoque_id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        tableName: 'estoque',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

Estoque.belongsTo(Localizacao, { foreignKey: 'estoque_loc_id' });

module.exports = Estoque;
