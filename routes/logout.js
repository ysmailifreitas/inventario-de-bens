const express = require("express");
const router = express.Router();
const {checkAuth} = require('../middlewares/auth');

router.use(checkAuth);

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;