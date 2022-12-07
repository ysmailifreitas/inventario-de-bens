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
    } else{
      res.redirect('home')
    }
  });

  console.log(user,pass);
}
