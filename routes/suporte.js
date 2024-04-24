const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const suporteController = require('../controllers/suporte');

router.use(checkAuth);

// Get Views
router.get("/suporte", suporteController.getSuportePage);

module.exports = router;
