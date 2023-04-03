const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv')
const path = require('path')
const moment = require('moment');
const { handlebars } = require("hbs");

dotenv.config({path: './.env'})

const app = express();

const db = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

handlebars.registerHelper('formatDate', function (date) { return moment(date).format('DD/MM/YYYY'); });
handlebars.registerHelper('formatDateHour', function (date) { return moment(date).format('DD/MM/YYYY HH:mm:ss'); });
handlebars.registerHelper('isdefined', function (value) {
  return value !== undefined;
});

app.set('view engine', 'hbs');

db.connect((error)=>{
  if(error){
    console.log(error);
  }else{
    console.log("mysql connected");
  }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/itens', require('./routes/itens'));
app.use('/fornecedor', require('./routes/fornecedor'));

app.listen(5000, () =>{
  console.log("listening on port 5000");
})
