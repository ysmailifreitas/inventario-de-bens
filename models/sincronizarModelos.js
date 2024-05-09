const CargoPermissao = require("./CargoPermissao");
const Cargos = require("./Cargos");
const CargoUsuario = require("./CargoUsuario");
const DadosDashboard = require("./DadosDashboard");
const Departamentos = require("./Departamentos");
const Estoque = require("./Estoque");
const Fornecedores = require("./Fornecedores");
const Localizacao = require("./Localizacao");
const Movimentacao = require("./Movimentacao");
const Patrimonio = require("./Patrimonio");
const PatrimonioEstoque = require("./PatrimonioEstoque");
const Permissoes = require("./Permissoes");
const {Usuarios} = require("./Usuarios");
const Tickets = require("./Tickets");
const Comentarios = require("./Comentarios");

// Função para sincronizar todos os modelos na sequência correta
async function sincronizarModelos() {
    try {
        await Departamentos.sync();
        await sincronizarCargos();
        await Usuarios.sync();
        await CargoUsuario.sync();
        await sincronizarPermissoes();
        await CargoPermissao.sync();
        await Fornecedores.sync();
        await Patrimonio.sync();
        await DadosDashboard.sync();
        await Localizacao.sync();
        await Estoque.sync();
        await PatrimonioEstoque.sync();
        await Movimentacao.sync();
        await Tickets.sync();
        await Comentarios.sync();

        console.log("Todos os modelos sincronizados com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar modelos:", error);
    }
}

async function sincronizarCargos() {
    const defaultCargoNomes = ['Gestor', 'Administrador', 'Supervisor', 'Comum'];
    const defaultDescricoes = ['Gestor do sistema', 'Administrador do Sistema', 'Supervisor do Sistema', 'Agente Comum do Sistema'];

    await Cargos.sync()
        .then(async () => {
            for (let i = 0; i < defaultCargoNomes.length; i++) {
                const cargoNome = defaultCargoNomes[i];
                const cargoDescricao = defaultDescricoes[i];
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
}

async function sincronizarPermissoes() {
    const defaultPermissions = [
        {perm_nome: 'adicionar_item', perm_descricao: 'Permissão para adicionar item'},
        {perm_nome: 'editar_item', perm_descricao: 'Permissão para editar item'},
        {perm_nome: 'excluir_item', perm_descricao: 'Permissão para excluir item'},
        {perm_nome: 'visualizar_item', perm_descricao: 'Permissão para visualizar item'}
    ];

    await Permissoes.sync()
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
}

module.exports = sincronizarModelos;