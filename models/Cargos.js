const {Sequelize, DataTypes} = require('sequelize');
const db = require('./db');

const Cargos = db.sequelize.define('cargos', {
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cargo_nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cargo_descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const defaultRoleNames = ['Gestor', 'Administrador', 'Supervisor', 'Comum'];
const defaultDescriptions = ['Gestor do sistema', 'Administrador do Sistema', 'Supervisor do Sistema', 'Agente Comum do Sistema'];

Cargos.sync()
    .then(async () => {
        for (let i = 0; i < defaultRoleNames.length; i++) {
            const cargoNome = defaultRoleNames[i];
            const cargoDescricao = defaultDescriptions[i];
            await Cargos.findOrCreate({
                where: {cargo_nome: cargoNome},
                defaults: {cargo_nome: cargoNome, cargo_descricao: cargoDescricao}
            });
        }

        console.log('Registros padrão de cargos adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de CARGOS:', error);
    });

module.exports = Cargos;
