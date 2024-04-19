const {Sequelize, DataTypes} = require('sequelize');
const db = require('./db');

const Permissoes = db.sequelize.define('permissoes', {
    perm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    perm_nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    perm_descricao: {
        type: DataTypes.STRING
    }
});

const defaultPermissions = [
    {perm_nome: 'adicionar_item', perm_descricao: 'Permissão para adicionar item'},
    {perm_nome: 'editar_item', perm_descricao: 'Permissão para editar item'},
    {perm_nome: 'excluir_item', perm_descricao: 'Permissão para excluir item'},
    {perm_nome: 'visualizar_item', perm_descricao: 'Permissão para visualizar item'}
];

Permissoes.sync()
    .then(async () => {
        for (const permissionData of defaultPermissions) {
            await Permissoes.findOrCreate({
                where: {perm_nome: permissionData.perm_nome},
                defaults: {...permissionData}
            });
        }

        console.log('Registros padrão de permissões adicionados com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de Permissões:', error);
    });

module.exports = Permissoes;
