const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

module.exports = router;