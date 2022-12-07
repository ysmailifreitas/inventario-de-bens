const express = require("express");
const router = express.Router();
// const Bens = require("../models/Bens")

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

router.get("/listarBem", (req, res) =>{
  res.render("listagem");
})


// router.post("/cadastrarBem", async (req, res) => {
//   //console.log(req.body);
//
//   await Bens.create(req.body)
//     .then(() => {
//       return res.json({
//         erro: false,
//         mensagem: "Usuário cadastrado com sucesso!"
//       });
//     }).catch(() => {
//       return res.status(400).json({
//         erro: true,
//         mensagem: "Erro: Usuário não cadastrado com sucesso!"
//       });
//     });
//
//   //res.send("Página cadastrar");
// });

module.exports = router;
