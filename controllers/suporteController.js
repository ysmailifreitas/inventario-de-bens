exports.getSuportePage = (req, res) => {
    res.render("suporte/suporte");
}

const ticketService = require("../services/ticketService");

exports.getTicketListagem = async (req, res) => {
    try {
        const {tickets, usuarioLogado} = await ticketService.getTicketListagem(req.session.username);
        res.render("suporte/tickets/listagem/tickets", {tickets, username: usuarioLogado});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar os Tickets");
    }
};

exports.getVisualizacaoTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const {ticket, usuarioLogado} = await ticketService.getVisualizacaoTicket(ticketId, req.session.username);
        if (ticket) {
            res.render("suporte/tickets/visualizacao/ticket", {ticket: ticket, username: usuarioLogado});
        } else {
            res.status(404).send("Ticket não encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o ticket.");
    }
}

exports.getCadastroTicketForm = async (req, res) => {
    res.render("suporte/tickets/cadastro/cadastroTicket");
}

exports.cadastrarTicket = async (req, res) => {
    try {
        let ticketDataSpread = {
            ticket_assunto: req.body.ticket_assunto,
            ticket_descricao: req.body.ticket_descricao,
            ticket_status: "Aberto",
            ticket_prioridade: "Indefinida"
        };

        await ticketService.criarTicket(ticketDataSpread, req.session.username);

        res.redirect("/suporte/tickets");
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao cadastrar ticket!");
    }
};
exports.getSuporteGerenciamentoPage = (req, res) => {
    res.render("suporte/gerenciamento/listagem");
}
exports.getSuporteGerenciamentoTicketsPage = async (req, res) => {
    try {
        const {tickets, usuarioLogado} = await ticketService.getTicketListagem(req.session.username);
        res.render("suporte/gerenciamento/tickets/listagem/tickets", {tickets, username: usuarioLogado});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar os Tickets");
    }
}
exports.getGerenciamentoVisualizacaoTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const {ticket, usuarioLogado} = await ticketService.getVisualizacaoTicket(ticketId, req.session.username);
        if (ticket) {
            res.render("suporte/gerenciamento/tickets/visualizacao/ticket", { ticket: ticket, username: usuarioLogado });
        } else {
            res.status(404).send("Ticket não encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar o ticket.");
    }
}

exports.alterarTicket = async (req, res) => {
    try {
        let ticketDataSpread = {
            ticket_id: req.params.id,
            username: req.session.username,
            ticket_status: req.body.ticket_status,
            ticket_prioridade: req.body.ticket_prioridade
        };

        await ticketService.atualizarTicket(ticketDataSpread);

        res.redirect(req.get('referer'));
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao cadastrar ticket!");
    }
};

exports.adicionarComentario = async (req, res) => {
    try {
        let comentarioDataSpread = {
            cmnt_texto: req.body.comentario,
            ticket_id: req.params.id,
            username: req.session.username,
        };

        await ticketService.adicionarComentario(comentarioDataSpread);

        res.redirect(req.get('referer'));
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao cadastrar comentário!");
    }
};