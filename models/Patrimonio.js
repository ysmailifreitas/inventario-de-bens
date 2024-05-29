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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nome do patrimônio não pode estar vazio"
            },
            len: {
                args: [4, 255],
                msg: "Nome do patrimônio deve ter pelo menos 4 caracteres"
            }
        }
    },
    pat_tipo: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    pat_data_aquisicao: {
        type: db.Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: "Data de aquisição deve ser uma data válida"
            },
            notEmpty: {
                msg: "Data de aquisição não pode estar vazia"
            }
        }
    },
    pat_valor: {
        type: db.Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isFloat: {
                msg: "Valor do patrimônio deve ser um número"
            },
            min: {
                args: [0],
                msg: "Valor do patrimônio deve ser maior ou igual a zero"
            },
            notEmpty: {
                msg: "Valor do patrimônio não pode estar vazio"
            }
        }
    },
    pat_estado: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    pat_depreciacao_anual: {
        type: db.Sequelize.FLOAT,
        allowNull: true,
        validate: {
            isFloat: {
                msg: "Depreciação anual deve ser um número"
            },
            min: {
                args: [0],
                msg: "Depreciação anual deve ser maior ou igual a zero"
            }
        }
    },
    pat_vida_util: {
        type: db.Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "Vida útil deve ser um número inteiro"
            },
            min: {
                args: [0],
                msg: "Vida útil deve ser maior ou igual a zero"
            }
        }
    }
}, {
    tableName: 'patrimonio',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

Patrimonio.belongsTo(Fornecedores, { foreignKey: 'pat_for_id', as: 'fornecedor', onDelete: 'RESTRICT', hooks: true });

module.exports = Patrimonio;