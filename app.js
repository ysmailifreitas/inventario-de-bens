const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');
const moment = require('moment');
const hbs = require("hbs");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')


dotenv.config({path: './.env'});

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Configuração do diretório de visualizações
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configuração do diretório de parciais
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Configuração do diretório de layouts
app.set('layout', 'layouts/layout');

app.use(express.static(path.join(__dirname, 'public')));

// Registre os helpers do HBS
hbs.registerHelper('formatDate', function (date) { return moment(date).format('DD/MM/YYYY'); });
hbs.registerHelper('formatDateHour', function (date) { return moment(date).format('DD/MM/YYYY HH:mm:ss'); });
hbs.registerHelper('isdefined', function (value) {
  return value !== undefined;
});

app.use('/', require('./routes/login'));
app.use('/', require("./routes/logout"));
app.use('/', require('./routes/home'));
app.use('/', require("./routes/itens"));
app.use('/', require("./routes/fornecedor"));
app.use('/', require('./routes/suporte'));
app.use('/', require('./routes/email'));
app.use('/', require('./routes/relatorios'));
app.use('/', require('./routes/usuarios'));
app.use('/', require('./routes/editPermissions'));

app.listen(3000, () => {
  console.log("listening on port 5000");
});
