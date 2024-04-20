const db = require("./db");
const Fornecedores = require("./Fornecedores");

const Patrimonio = db.sequelize.define('patrimonio', {
        pat_id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pat_nome: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        pat_tipo: {
            type: db.Sequelize.STRING,
            allowNull: true
        },
        pat_data_aquisicao: {
            type: db.Sequelize.DATEONLY,
            allowNull: false
        },
        pat_valor: {
            type: db.Sequelize.FLOAT,
            allowNull: false
        },
        pat_estado: {
            type: db.Sequelize.STRING,
            allowNull: true
        },
        pat_depreciacao_anual: {
            type: db.Sequelize.FLOAT,
            allowNull: true
        },
        pat_vida_util: {
            type: db.Sequelize.INTEGER,
            allowNull: true
        },
    },
    {
        tableName: 'patrimonio',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

Patrimonio.belongsTo(Fornecedores, { foreignKey: 'pat_for_id', onDelete: 'RESTRICT', hooks: true });

module.exports = Patrimonio;
