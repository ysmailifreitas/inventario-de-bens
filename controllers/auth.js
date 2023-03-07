const {use} = require("express/lib/router");
const mysql = require("mysql");

const db = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.login = (req, res) => {
  console.log(req.body);

  const user = req.body.username;
  const pass = req.body.password;

  db.query('SELECT username, password FROM users WHERE username = ? AND password =?', [user, pass], (error, results)=>{
    if(error){
      console.log(error);
    }
    if(results.length > 0){
      res.redirect('home')
    }else{
      res.render('login')
    }
  });

  // console.log(user,pass);
}

exports.cadastrarBem = (req, res) => {
  const descricao = req.body.descricao;
  const quantidade = req.body.quantidade;
  const fornecedor = req.body.fornecedor;
  const data_aquisicao = req.body.data_aquisicao;

  db.query('SELECT be_descricao FROM bens WHERE be_descricao = ?', [descricao], (error, results)=>{
    if(error){
      console.log(error);
    }
    if(results.length > 0){

    }else{
      db.query('INSERT INTO bens (be_descricao,be_quantidade,be_fornecedor,be_data_aquisicao) VALUES (?,?,?,?)',[descricao,quantidade,fornecedor,data_aquisicao],(error,results)=>{
        if(error){
          console.log(error);
        }
        console.log(results);
        res.render('listagem')
      })
    }
  });
}
exports.home = (req, res) => {
  res.render('home')
}
