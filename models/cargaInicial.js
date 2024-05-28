// const db = require('./db');
const Cargos = require('./Cargos');
const Permissoes = require('./Permissoes');
const Departamentos = require("./Departamentos");
const {Usuarios} = require("./Usuarios");
const CargoUsuario = require("./CargoUsuario");
const CargoPermissao = require("./CargoPermissao");
const Fornecedores = require("./Fornecedores");
const Patrimonio = require("./Patrimonio");
const DadosDashboard = require("./DadosDashboard");
const Localizacao = require("./Localizacao");
const Estoque = require("./Estoque");
const PatrimonioEstoque = require("./PatrimonioEstoque");
const Movimentacao = require("./Movimentacao");
const Tickets = require("./Tickets");
const Comentarios = require("./Comentarios");

async function inserirDadosIniciais(){
    try{
        await inserirDepartamentoPadrao();
        await inserirCargosPadrao()
        await inserirUsuarioPadrao()
        await inserirCargoUsuarioPadrao()
        await inserirPermissoesPadrao()
        await inserirCargoPermissaoPadrao()
        await inserirFornecedorPadrao()
        await inserirPatrimonioPadrao()
        await inserirDadosDashboardPadrao()
        await inserirLocalizacaoPadrao()
        await inserirEstoquePadrao()
        await inserirPatrimonioEstoquePadrao()
        await inserirMovimentacaoPadrao();
        await inserirTicketsPadrao()
        await inserirComentariosPadrao();

    }catch(err){
        console.log("Erro ao inserir dados inciais: ", err)
    }
}

async function inserirDepartamentoPadrao() {
    try {
        const count = await Departamentos.count();
        if (count === 0) {
            await Departamentos.create({
                dep_nome: 'Departamento de TI',
                dep_descricao: 'Responsável por gerenciar os recursos de tecnologia da informação da empresa.',
                dep_responsavel: 'Elon Musk'
            });
            console.log('Departamento padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir o departamento padrão:', error);
    }
}

async function inserirCargosPadrao() {
    const defaultCargoNomes = ['Gestor', 'Administrador', 'Supervisor', 'Suporte', 'Comum'];
    const defaultDescricoes = ['Gestor do sistema', 'Administrador do Sistema', 'Supervisor do Sistema', 'Suporte do Sistema', 'Agente Comum do Sistema'];

    try {
        const count = await Cargos.count();
        if (count === 0) {
            for (let i = 0; i < defaultCargoNomes.length; i++) {
                const cargoNome = defaultCargoNomes[i];
                const cargoDescricao = defaultDescricoes[i];
                await Cargos.findOrCreate({
                    where: {cargo_nome: cargoNome},
                    defaults: {cargo_nome: cargoNome, cargo_descricao: cargoDescricao}
                });
            }
            console.log('Cargos padrão inseridos com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir cargos padrão:', error);
    }
}

async function inserirUsuarioPadrao() {
    try {
        const count = await Usuarios.count();
        if (count === 0) {
            await Usuarios.create({
                usr_nome: 'admin',
                usr_pass: '$2b$10$yB6XCb7w812fccmWx5wI3.RvYErFHgjhdN6HrxFPh7FaAOkPQdeaW',
                usr_cargo: 'Administrador',
                usr_dep: 'TI',
            });
            console.log('Usuário padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir usuário padrão:', error);
    }
}

async function inserirCargoUsuarioPadrao() {
    try {
        const count = await CargoUsuario.count();
        if (count === 0) {
            // Assumindo que usr_id e cargo_id padrão sejam 1
            await CargoUsuario.create({
                usr_id: 1,
                cargo_id: 1
            });
            console.log('Cargo-usuário padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir cargo-usuário padrão:', error);
    }
}

async function inserirPermissoesPadrao() {
    const defaultPermissions = [
        {perm_nome: 'adicionar_item', perm_descricao: 'Permissão para adicionar item'},
        {perm_nome: 'editar_item', perm_descricao: 'Permissão para editar item'},
        {perm_nome: 'excluir_item', perm_descricao: 'Permissão para excluir item'},
        {perm_nome: 'visualizar_item', perm_descricao: 'Permissão para visualizar item'}
    ];

    try {
        const count = await Permissoes.count();
        if (count === 0) {
            for (const permissionData of defaultPermissions) {
                await Permissoes.findOrCreate({
                    where: {perm_nome: permissionData.perm_nome},
                    defaults: {...permissionData}
                });
            }
            console.log('Permissões padrão inseridas com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir permissões padrão:', error);
    }
}

async function inserirCargoPermissaoPadrao() {
    try {
        const count = await CargoPermissao.count();
        if (count === 0) {
            // Supondo que cargo_id 1 corresponde a 'Administrador' e perm_id 1 corresponde a 'adicionar_item'
            await CargoPermissao.create({
                cargo_id: 1,
                perm_id: 1
            });
            await CargoPermissao.create({
                cargo_id: 1,
                perm_id: 2
            });
            await CargoPermissao.create({
                cargo_id: 1,
                perm_id: 3
            });
            await CargoPermissao.create({
                cargo_id: 1,
                perm_id: 4
            });

            console.log('CargoPermissao padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir cargo-permissão padrão:', error);
    }
}

async function inserirFornecedorPadrao() {
    try {
        const count = await Fornecedores.count();
        if (count === 0) {
            await Fornecedores.create({
                for_nome: 'TechSupplies Ltda.',
                for_cnpj: '12.345.678/0001-99',
                for_telefone: '(11) 98765-4321',
                for_email: 'contato@techsupplies.com'
            });

            console.log('Fornecedor padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir fornecedor padrão:', error);
    }
}

async function inserirPatrimonioPadrao() {
    try {
        const count = await Patrimonio.count();
        if (count === 0) {
            await Patrimonio.create({
                pat_nome: 'Laptop Dell Inspiron 15',
                pat_tipo: 'Eletrônico',
                pat_data_aquisicao: new Date(),
                pat_valor: 3500.0,
                pat_estado: 'Novo',
                pat_depreciacao_anual: 10.0,
                pat_vida_util: 5,
                pat_for_id: 1 // Supondo que o fornecedor padrão inserido tenha ID 1
            });

            console.log('Patrimônio padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir patrimônio padrão:', error);
    }
}

async function inserirDadosDashboardPadrao() {
    try {
        const count = await DadosDashboard.count();
        if (count === 0) {
            await DadosDashboard.create({
                valor_total: 3500.0,
                depreciacao_anual: 10.0,
                taxa_depreciacao_anual: 1.0,
                taxa_utilizacao: 0.8,
                valor_liquido: 800.0,
                roi: 5.0,
                pat_id: 1 // Supondo que o patrimônio padrão inserido tenha ID 1
            });

            console.log('Dados de dashboard padrão inseridos com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir dados de dashboard padrão:', error);
    }
}

async function inserirLocalizacaoPadrao() {
    try {
        const count = await Localizacao.count();
        if (count === 0) {
            await Localizacao.create({
                loc_nome: 'Sala 301',
                loc_descricao: 'Sala de reuniões no terceiro andar do prédio principal.',
                loc_responsavel: 'Jon Sudano'
            });

            console.log('Localização padrão inserida com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir localização padrão:', error);
    }
}

async function inserirEstoquePadrao() {
    try {
        const count = await Estoque.count();
        if (count === 0) {
            await Estoque.create({
                estoque_loc_id: 1 // Supondo que a localização padrão inserida tenha ID 1
            });

            console.log('Estoque padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir estoque padrão:', error);
    }
}

async function inserirPatrimonioEstoquePadrao() {
    try {
        const count = await PatrimonioEstoque.count();
        if (count === 0) {
            // Supondo que o patrimônio e o estoque padrão tenham ID 1
            await PatrimonioEstoque.create({
                quantidade: 10,
                pat_id: 1,
                estoque_id: 1
            });

            console.log('Relação entre patrimônio e estoque padrão inserida com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir relação entre patrimônio e estoque padrão:', error);
    }
}

async function inserirMovimentacaoPadrao() {
    try {
        const count = await Movimentacao.count();
        if (count === 0) {
            // Supondo que o patrimônio padrão inserido tenha ID 1 e a localização padrão inserida tenha ID 1
            await Movimentacao.create({
                mov_pat_id: 1,
                mov_responsavel: 'Responsável Padrão',
                mov_tipo: 'Entrada',
                mov_motivo: 'Compra',
                mov_loc_origem_id: 1,
                mov_loc_destino_id: 1
            });

            console.log('Movimentação padrão inserida com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir movimentação padrão:', error);
    }
}


async function inserirTicketsPadrao() {
    try {
        const count = await Tickets.count();
        if (count === 0) {
            // Supondo que o usuário padrão inserido tenha ID 1
            await Tickets.create({
                ticket_assunto: 'Alterar a senha não está funcionando',
                ticket_descricao: 'Descrição Padrão',
                ticket_status: 'Fechado',
                ticket_prioridade: 'Alta',
                usr_id: 1
            });

            console.log('Ticket padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir ticket padrão:', error);
    }
}

async function inserirComentariosPadrao() {
    try {
        const count = await Comentarios.count();
        if (count === 0) {
            // Supondo que o usuário padrão inserido tenha ID 1
            await Comentarios.create({
                cmnt_texto: 'Obrigado por resolver meu problema!',
                usr_id: 1,
                ticket_id: 1
            });

            console.log('Comentário padrão inserido com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao inserir comentário padrão:', error);
    }
}

module.exports = inserirDadosIniciais