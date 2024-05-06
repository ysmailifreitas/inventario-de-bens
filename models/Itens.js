const db = require("./db");
const Fornecedor = require("./Fornecedor");

const Itens = db.sequelize.define('itens', {
    it_nome: {
        type: db.Sequelize.STRING
    },
    it_quantidade: {
        type: db.Sequelize.INTEGER
    },
    it_dataAquisicao: {
        type: db.Sequelize.DATEONLY
    },
    it_preco_unitario: {
        type: db.Sequelize.FLOAT
    },
    it_valor_total: { // Adicionando o campo it_valor_total
        type: db.Sequelize.FLOAT
    },
    it_depreciacao_anual: { // Adicionando o campo it_depreciacao_anual
        type: db.Sequelize.FLOAT
    },
    for_id: {
        type: db.Sequelize.STRING
    },
    it_for_nome: {
        type: db.Sequelize.STRING
    },
    it_preco_unitario: {
        type: db.Sequelize.FLOAT, // Tipo float para armazenar valores com decimais
        allowNull: true // Permitir valores nulos, se necessário
    },
    it_categoria: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    it_descricao: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    it_localizacao: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    it_valor_compra: {
        type: db.Sequelize.FLOAT,
        allowNull: true
    },
    it_valor_venda: {
        type: db.Sequelize.FLOAT,
        allowNull: true
    },
    it_estado_conservacao: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
})

Itens.afterSync(() => {
    // Adicione seus valores padrão aqui
    const defaultValues = {
        it_nome: 'Nome Padrão',
        it_quantidade: 0,
        it_dataAquisicao: new Date(),
        // Adicione valores padrão para outros campos
    };

    return Itens.create(defaultValues)
        .then(() => console.log('Valores padrão adicionados com sucesso'))
        .catch(err => console.error('Erro ao adicionar valores padrão:', err));
});
// Fornecedor.hasMany(Itens, {foreignKey: 'for_id'});
// Itens.belongsTo(Fornecedor, {foreignKey: 'for_id'});

module.exports = Itens;
