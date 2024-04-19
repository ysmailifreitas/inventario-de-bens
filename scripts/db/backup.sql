USE
inventario;

DROP TABLE IF EXISTS cargo_permissao;
DROP TABLE IF EXISTS cargo_usuario;
DROP TABLE IF EXISTS cargos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS dados_dashboards;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS estoque;
DROP TABLE IF EXISTS patrimonio;
DROP TABLE IF EXISTS localizacao;
DROP TABLE IF EXISTS departamento;
DROP TABLE IF EXISTS movimentacao;

CREATE TABLE usuarios
(
    usr_id            INT AUTO_INCREMENT PRIMARY KEY,
    usr_nome          VARCHAR(255) NOT NULL DEFAULT 'admin',
    usr_dep           VARCHAR(255) NOT NULL DEFAULT 'GOV',
    usr_pass          VARCHAR(255) NOT NULL DEFAULT '$2b$10$KeWip07yeZcurqQKAUv3ouVwbNFzM0WvaTwAG9zX7OkPceKghSoxu',
    usr_cargo         VARCHAR(255) NOT NULL DEFAULT 'Comum',
    resetToken        VARCHAR(255)          DEFAULT NULL,
    resetTokenExpires TIMESTAMP             DEFAULT NULL,
    createdAt         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updatedAt         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into usuarios
    (usr_id, usr_nome, usr_dep, usr_pass, usr_cargo, createdAt, updatedAt)
values ('1', 'admin', 'GOV', '$2b$10$iS/kpcc8pTnLPdvmAWFE6uHqjhEXnQgdVY1eoiR5V1Rohzk48W5.G',
        'Comum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE cargos
(
    cargo_id        INT AUTO_INCREMENT PRIMARY KEY,
    cargo_nome      VARCHAR(30) not null,
    cargo_descricao VARCHAR(30) not null,
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO cargos (cargo_id, cargo_nome, cargo_descricao, createdAt, updatedAt)
VALUES (1, 'Gestor', 'Gestor do Sistema', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO cargos (cargo_id, cargo_nome, cargo_descricao, createdAt, updatedAt)
VALUES (2, 'Administrador', 'Administrador do Sistema', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO cargos (cargo_id, cargo_nome, cargo_descricao, createdAt, updatedAt)
VALUES (3, 'Supervisor', 'Supervisor do Sistema', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO cargos (cargo_id, cargo_nome, cargo_descricao, createdAt, updatedAt)
VALUES (4, 'Comum', 'Agente Comum do Sistema', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE cargo_usuario
(
    usr_id   int not null,
    cargo_id int not null
);

INSERT INTO cargo_usuario(usr_id, cargo_id)
values (1, 1);

-- Create the Fornecedores table
CREATE TABLE fornecedores
(
    for_id       INT AUTO_INCREMENT PRIMARY KEY,
    for_nome     VARCHAR(255) NOT NULL,
    for_cnpj     VARCHAR(255) NOT NULL,
    for_telefone VARCHAR(15)  NOT NULL,
    for_email    VARCHAR(255) NOT NULL,
    createdAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the Fornecedores table
INSERT INTO fornecedores (for_nome, for_cnpj, for_telefone, for_email)
VALUES ('Exemplo Fornecedores', '1727822900001', '67995542871', 'example@gmail.com');

-- Create the Item table
CREATE TABLE patrimonio
(
    pat_id                INT AUTO_INCREMENT PRIMARY KEY,
    pat_for_id            VARCHAR(50)    NOT NULL,
    pat_nome              VARCHAR(255)   NOT NULL,
    pat_tipo              VARCHAR(255)   NOT NULL,
    pat_data_aquisicao    DATE           NOT NULL,
    pat_valor             DECIMAL(10, 2) NOT NULL,
    pat_estado            VARCHAR(50)    NOT NULL,
    pat_depreciacao_anual DECIMAL(5, 2)  NOT NULL,
    pat_vida_util         VARCHAR(50)    NOT NULL,
    createdAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the patrimonio table
INSERT INTO patrimonio (pat_nome, pat_for_id, pat_tipo, pat_data_aquisicao, pat_valor, pat_estado,
                        pat_depreciacao_anual, pat_vida_util, createdAt, updatedAt)
VALUES ('Exemplo Patrimonio', 'fornecedor123', 'Eletrônicos', '2023-11-18', 199.90, 'Bom', 5.0, '10 anos',
        '2023-11-18 00:00:00', '2023-11-18 00:00:00');

-- Create the Estoque table
CREATE TABLE estoque
(
    estoque_id     INT AUTO_INCREMENT PRIMARY KEY,
    estoque_pat_id VARCHAR(50)  NOT NULL,
    estoque_loc_id VARCHAR(255) NOT NULL,
    estoque_qtde   VARCHAR(255) NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the patrimonio table
INSERT INTO estoque (estoque_pat_id, estoque_loc_id, estoque_qtde, createdAt, updatedAt)
VALUES (1, 1, 5, '2023-11-18 00:00:00', '2023-11-18 00:00:00');

-- Create the Localizacao table
CREATE TABLE localizacao
(
    loc_id     INT AUTO_INCREMENT PRIMARY KEY,
    loc_nome VARCHAR(50)  NOT NULL,
    loc_descricao VARCHAR(50)  NOT NULL,
    loc_responsavel VARCHAR(50)  NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the localizacao table
INSERT INTO localizacao (loc_nome, loc_descricao, loc_responsavel, createdAt, updatedAt)
VALUES ('Sala 3', 'Localização de Patrimonios Farmaceuticos', 'admin', '2023-11-18 00:00:00', '2023-11-18 00:00:00');

-- Create the departamentos table
CREATE TABLE departamentos
(
    dep_id     INT AUTO_INCREMENT PRIMARY KEY,
    dep_nome VARCHAR(50)  NOT NULL,
    dep_descricao VARCHAR(50)  NOT NULL,
    dep_responsavel VARCHAR(50)  NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the departamentos table
INSERT INTO departamentos (dep_nome, dep_descricao, dep_responsavel, createdAt, updatedAt)
VALUES ('GOVERNO', 'Departamento do Governo', 'admin', '2023-11-18 00:00:00', '2023-11-18 00:00:00');

-- Create the movimentacao table
CREATE TABLE movimentacao
(
    mov_id     INT AUTO_INCREMENT PRIMARY KEY,
    mov_pat_id INT NOT NULL,
    mov_loc_origem_id INT NOT NULL,
    mov_loc_destino_id INT NOT NULL,
    mov_responsavel VARCHAR(50)  NOT NULL,
    mov_tipo VARCHAR(50)  NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the departamentos table
INSERT INTO movimentacao (mov_pat_id, mov_loc_origem_id, mov_loc_destino_id, mov_responsavel, mov_tipo, createdAt, updatedAt)
VALUES (1, 1, 1, 'admin', 'Entrada', '2023-11-18 00:00:00', '2023-11-18 00:00:00');


-- Insert data into the dados_dashboard table
CREATE TABLE dados_dashboards
(
    id                     INT AUTO_INCREMENT PRIMARY KEY,
    valor_total            FLOAT,
    depreciacao_anual      FLOAT,
    taxa_depreciacao_anual FLOAT,
    taxa_utilizacao        FLOAT,
    valor_liquido          FLOAT,
    roi                    FLOAT,
    pat_id                 INT,
    FOREIGN KEY (pat_id) REFERENCES patrimonio (pat_id),
    createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO dados_dashboards (valor_total, depreciacao_anual, taxa_depreciacao_anual, taxa_utilizacao, valor_liquido,
                              roi, pat_id, createdAt, updatedAt)
VALUES (10.2, 2.3, 0.2, 0.5, 8.9, 0.1, 1, '2021-11-18 00:00:00', '2021-11-18 00:00:00');
