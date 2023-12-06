const helmet = require('helmet');

module.exports = function configureHelmet(app) {
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'default-src': ["'self'"],
                    'img-src': ["'self'"],
                },
            },
            hsts: {
                maxAge: 63072000, // 2 anos em segundos
                includeSubDomains: true,
                preload: true,
            },
            frameguard: {
                action: 'deny',
            },
            referrerPolicy: {
                policy: 'same-origin',
            },
            // Outras configurações do helmet aqui
        })
    );
};
