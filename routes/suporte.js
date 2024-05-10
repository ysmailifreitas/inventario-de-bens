const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const suporteController = require('../controllers/suporteController');

router.use(checkAuth);

// Get Views
router.get("/suporte", suporteController.getSuportePage);
router.get("/suporte/tickets", suporteController.getTicketListagem);
router.get("/suporte/tickets/:id", suporteController.getVisualizacaoTicket);
router.get("/cadastrarTicket", suporteController.getCadastroTicketForm);

// Ações
router.post("/cadastrarTicket", suporteController.cadastrarTicket);

module.exports = router;
