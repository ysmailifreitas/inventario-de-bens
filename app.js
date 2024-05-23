const express = require("express");
const https = require("https");
const path = require('path');
const fs = require("fs");
const dotenv = require('dotenv');
const moment = require('moment');
const hbs = require("hbs");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const sincronizarModelos = require("./models/sincronizarModelos");

dotenv.config({path: './.env'});

const app = express();

// -- Configurações iniciais

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('layout', 'layouts/layout');

// -- Configurações do Express

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// -- Middlewares

// Helmet
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
}));
app.use(helmet.noSniff());
app.use(helmet.frameguard({action: 'deny'}));

// Limite de requisições
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 500, //500 requisicoes por windowMs (se exceder mostra a mensagem)
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// -- Configuração de sessão e banco de dados
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000,
    }
}));

sincronizarModelos();

// -- Helpers do HBS
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.registerHelper('formatDate', function (date) {
    return moment(date).format('DD/MM/YYYY');
});
hbs.registerHelper('formatDateHour', function (date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
});
hbs.registerHelper('isdefined', function (value) {
    return value !== undefined;
});
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('includes', function (array, value, options) {
    return array.includes(value) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('statusClass', function(prioridade) {
    switch (prioridade) {
        case 'Aberto':
            return 'text-green-600 bg-green-200';
        case 'Em Andamento':
            return 'text-yellow-600 bg-yellow-200';
        case 'Fechado':
            return 'text-gray-600 bg-gray-200';
    }
});
hbs.registerHelper('prioridadeClass', function(status) {
    switch (status) {
        case 'Baixa':
            return 'text-green-600 bg-green-200';
        case 'Média':
            return 'text-yellow-600 bg-yellow-200';
        case 'Alta':
            return 'text-red-600 bg-red-200';
    }
});
hbs.registerHelper('truncateDate', function(date, maxLength) {
    if (date instanceof Date) {
        // Converte a data para uma string no formato 'yyyy-mm-dd hh:mm:ss'
        const dateString = date.toISOString().slice(0, 19).replace('T', ' ');
        if (dateString.length <= maxLength) {
            return dateString;
        } else {
            return dateString.slice(0, maxLength) + '...';
        }
    } else {
        return date; // Retorna a data sem alterações se não for uma instância de Date
    }
});

// -- Rotas
app.use('/', require('./routes/login'));
app.use('/', require("./routes/logout"));
app.use('/', require('./routes/home'));
app.use('/', require("./routes/patrimonio"));
app.use('/', require("./routes/fornecedor"));
app.use('/', require('./routes/suporte'));
app.use('/', require('./routes/email'));
//app.use('/', require('./routes/relatorios'));
app.use('/', require('./routes/usuarios'));
app.use('/', require('./routes/editPermissions'));
app.use('/', require('./routes/perfilUsuario'));
app.use('/', require('./routes/cadastros'));
app.use('/', require('./routes/estoque'));
app.use('/', require('./routes/movimentacoes'));
// Inicialização do servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const PORT = process.env.PORT || 3443;

// const sslServer = https.createServer({
//     key: fs.readFileSync('/root/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/inventario.based.lat/inventario.based.lat.key'),
//     cert: fs.readFileSync('/etc/ssl/cert.pem'),
// },app);
//
// sslServer.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })