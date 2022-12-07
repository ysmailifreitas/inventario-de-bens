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
    }

  });

  // console.log(user,pass);
}

exports.cadastrarBem = (req, res) => {
  const tipo = req.body.tipo;
  const modelo = req.body.modelo;
  const codigo = req.body.codigo;
  const fornecedor = req.body.fornecedor;
  const cnpj = req.body.cpnj;
  const data_alteracao = req.body.data_alteracao;
  const descricao = req.body.descricao;
  console.log(cnpj)
  db.query('SELECT cnpj FROM bens WHERE cnpj = ?', [cnpj], (error, results)=>{
    if(error){
      console.log(error);
    }
    if(results.length > 0){

    }else{
      db.query('INSERT INTO bens (tipo,modelo,codigo,fornecedor,cnpj,data_alteracao,descricao) VALUES (?,?,?,?,?,?,?)',[tipo,modelo,codigo,fornecedor,cnpj,data_alteracao,descricao],(error,results)=>{
        if(error){
          console.log(error);
        }
        console.log(results);
      })
    }

  });

  // console.log(user,pass);
}
exports.home = (req, res) => {
  res.render('home')
}
