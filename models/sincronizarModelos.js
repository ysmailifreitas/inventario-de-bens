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
const inserirDadosIniciais = require("./cargaInicial");

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

        await inserirDadosIniciais();

        console.log("Todos os modelos sincronizados com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar modelos:", error);
    }
}

async function sincronizarCargos() {
    await Cargos.sync().catch((error) => {
        console.error('Erro ao sincronizar tabela de CARGOS:', error);
    });
}

async function sincronizarPermissoes() {
    await Permissoes.sync().catch((error) => {
        console.error('Erro ao sincronizar tabela de Permissões:', error);
    });
}

module.exports = sincronizarModelos;