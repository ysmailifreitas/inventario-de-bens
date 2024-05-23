const {Usuarios} = require("../models/Usuarios");
const Tickets = require("../models/Tickets");
const Comentarios = require("../models/Comentarios");

exports.getTicketListagem = async (username) => {
    let usuarioLogado = await Usuarios.findOne({where: {usr_nome: username}});
    const tickets = await Tickets.findAll({
        include: [{
            model: Usuarios,
            as: 'usuarioId',
            attributes: ['usr_id']
        }]
    });
    return {tickets,usuarioLogado};
};

exports.getVisualizacaoTicket = async (id, username) => {
    try {
        let usuarioLogado = await Usuarios.findOne({where: {usr_nome: username}});
        const ticket = await Tickets.findOne({
            where: { ticket_id: id },
            include: {
                model: Comentarios,
                as: 'comentarios',
                include: {
                    model: Usuarios,
                    as: 'usuario'
                }
            } // Aqui você pode simplesmente incluir os comentários, já que a associação está definida
        });
        return {ticket,usuarioLogado};
    } catch (error) {
        console.error('Erro ao buscar o ticket com comentários:', error);
        throw error;
    }
};

exports.criarTicket = async function (spreadElements, username) {
    const usrId = await Usuarios.findOne({where:{usr_nome: username}}).then((usr) => usr.usr_id);

    await Tickets.create({
        usr_id: usrId,
        ...spreadElements
    });
}

exports.atualizarTicket = async (dadosObj) => {
    const usrId = await Usuarios.findOne({where:{usr_nome: dadosObj.username}}).then((usr) => usr.usr_id);
    const ticket = await Tickets.findOne({where: {ticket_id: dadosObj.ticket_id}}).then((ticket) => ticket);

    if(ticket){
        await ticket.update({
            ticket_status: dadosObj.ticket_status,
            ticket_prioridade: dadosObj.ticket_prioridade
        });
    }
};

exports.adicionarComentario = async (dadosObj, username) => {
    const usrId = await Usuarios.findOne({where:{usr_nome: dadosObj.username}}).then((usr) => usr.usr_id);

    await Comentarios.create({
        cmnt_texto: dadosObj.cmnt_texto,
        usr_id: usrId,
        ticket_id: dadosObj.ticket_id
    });
};
//
// exports.deletarTicket = (patId, callback) => {
// };