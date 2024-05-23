const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const checkPermissions = require('../middlewares/checkPermissoes');
const suporteController = require('../controllers/suporteController');

router.use(checkAuth);

// Get Views
router.get("/suporte", suporteController.getSuportePage);
router.get("/suporte/tickets", suporteController.getTicketListagem);
router.get("/suporte/tickets/:id", suporteController.getVisualizacaoTicket);
router.get("/cadastrarTicket", suporteController.getCadastroTicketForm);

router.get("/suporte/gerenciamento", checkPermissions('Suporte'), suporteController.getSuporteGerenciamentoPage);
router.get("/suporte/gerenciamento/tickets", checkPermissions('Suporte'), suporteController.getSuporteGerenciamentoTicketsPage);
router.get("/suporte/gerenciamento/tickets/:id", suporteController.getGerenciamentoVisualizacaoTicket);

// Ações
router.post("/cadastrarTicket", suporteController.cadastrarTicket);
router.post("/alterarTicket/:id", checkPermissions('Suporte'), suporteController.alterarTicket);
router.post("/adicionarComentario/:id", checkPermissions('Suporte'), suporteController.adicionarComentario);

module.exports = router;