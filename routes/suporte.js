const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/suporte", (req, res) => {
    res.render("suporte");
});

module.exports = router;
