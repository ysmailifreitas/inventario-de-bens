const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');
const homeController = require('../controllers/homeController');

router.use(checkAuth);

// Get Views
router.get("/home", homeController.getHomePage);

module.exports = router;
