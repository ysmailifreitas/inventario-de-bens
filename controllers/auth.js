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

  const {username, password} = req.body;

  db.query('SELECT username FROM users WHERE username = ?', [username], (error, results)=>{
    if(error){
      console.log(error);
    } else{
      console.log(results)
      res.render('home')
    }
  });

  console.log(username,password);
}
