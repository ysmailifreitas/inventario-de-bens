const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');
const moment = require('moment');
const hbs = require("hbs");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

dotenv.config({path: './.env'});

const app = express();

app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
}));
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: 'deny' }));


const limiter = rateLimit({
  windowMs: 15 * 1000,
  max: 200,
  message: "Too many requests from this IP, please try again later."
});



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 300000,
  }
}));


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.set('layout', 'layouts/layout');

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerHelper('formatDate', function (date) { return moment(date).format('DD/MM/YYYY'); });
hbs.registerHelper('formatDateHour', function (date) { return moment(date).format('DD/MM/YYYY HH:mm:ss'); });
hbs.registerHelper('isdefined', function (value) {
  return value !== undefined;
});
hbs.registerHelper('ifEquals', function(arg1, arg2, options){
  return(arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('includes', function (array, value, options) {
  return array.includes(value) ? options.fn(this) : options.inverse(this);
});

app.use('/', require('./routes/login'));
app.use('/', require("./routes/logout"));
app.use('/', require('./routes/home'));
app.use('/', require("./routes/patrimonio"));
app.use('/', require("./routes/fornecedor"));
app.use('/', require('./routes/suporte'));
app.use('/', require('./routes/email'));
app.use('/', require('./routes/relatorios'));
app.use('/', require('./routes/usuarios'));
app.use('/', require('./routes/editPermissions'));
app.use('/', require('./routes/userProfile'));
app.use('/', require('./routes/cadastros'));
app.use('/', require('./routes/estoque'));
app.use('/', require('./routes/movimentacoes'));

app.listen(4000, () => {
  console.log("listening on port 4000");
});
