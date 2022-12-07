const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
  res.render("index");
})

router.get("/home", (req, res) =>{
  res.render("home");
})

router.get("/cadastrarBem", (req, res) =>{
  res.render("cadastro");
})

router.get("/login", (req, res) =>{
  res.render("login");
})

module.exports = router;
