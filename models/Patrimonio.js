const db = require("./db");
const Fornecedor = require("./Fornecedores");

const Patrimonio = db.sequelize.define('patrimonio', {
        pat_id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pat_for_id: {
            type: db.Sequelize.INTEGER,
            references: {
                model: Fornecedor,
                key: 'for_id'
            }
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
Patrimonio.afterSync(() => {
    const defaultValues = {
        pat_nome: 'Nome Padrão',
        pat_data_aquisicao: new Date(),
        pat_valor: 0.0,
        pat_depreciacao_anual: 0.0,
        pat_vida_util: 0
    };

    return Patrimonio.create(defaultValues)
        .then(() => console.log('Valores padrão adicionados com sucesso'))
        .catch(err => console.error('Erro ao adicionar valores padrão:', err));
});

module.exports = Patrimonio;
