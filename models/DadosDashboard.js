const db = require("./db");

const DadosDashboard = db.sequelize.define("dados_dashboard", {
    valor_total: {
        type: db.Sequelize.FLOAT,
    },
    depreciacao_anual: {
        type: db.Sequelize.FLOAT,
    },
    taxa_depreciacao_anual: {
        type: db.Sequelize.FLOAT,
    },
    taxa_utilizacao: {
        type: db.Sequelize.FLOAT,
    },
    valor_liquido: {
        type: db.Sequelize.FLOAT,
    },
    roi: {
        type: db.Sequelize.FLOAT,
    },
    item_id: {
        type: db.Sequelize.INTEGER,
    },
});

// DadosDashboard.sync({force:true})

module.exports = DadosDashboard;
