const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    return res.redirect('/home');
  }
  res.render("login");
});

router.post("/login", authController.login);

module.exports = router;