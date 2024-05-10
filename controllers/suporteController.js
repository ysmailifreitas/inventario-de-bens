exports.getSuportePage = (req, res) => {
    res.render("suporte/suporte");
}

const ticketService = require("../services/ticketService");

exports.getTicketListagem = async (req, res) => {
    try {
        const {tickets, usuarioLogado} = await ticketService.getTicketListagem(req.session.username);
        res.render("suporte/tickets/listagem/tickets", {tickets, usuarioLogado});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar os Tickets");
    }
};

exports.getVisualizacaoTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await ticketService.getVisualizacaoTicket(ticketId);
        if (ticket) {
            console.log('ticket: ', ticket)
            res.render("suporte/tickets/visualizacao/ticket", {ticket: ticket});
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
        console.log('ticket_assunto', req.body.ticket_assunto)
        console.log('ticket_descricao', req.body.ticket_descricao)
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
