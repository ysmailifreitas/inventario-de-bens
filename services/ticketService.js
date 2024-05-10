const {Usuarios} = require("../models/Usuarios");
const Tickets = require("../models/Tickets");

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

exports.getVisualizacaoTicket = (id) => {
    let ticket = Tickets.findOne({where: {ticket_id: id}})
    return ticket
}

exports.criarTicket = async function (spreadElements, username) {
    const usrId = await Usuarios.findOne({where:{usr_nome: username}}).then((usr) => usr.usr_id);

    await Tickets.create({
        usr_id: usrId,
        ...spreadElements
    });
}

// exports.atualizarTicket = (patId, dadosObj, callback) => {
// };
//
// exports.deletarTicket = (patId, callback) => {
// };
