USE inventario;

DROP TABLE IF EXISTS departamentos;
DROP TABLE IF EXISTS cargo_usuario;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS cargo_permissao;
DROP TABLE IF EXISTS cargos;
DROP TABLE IF EXISTS permissoes;
DROP TABLE IF EXISTS movimentacao;
DROP TABLE IF EXISTS patrimonio_estoque;
DROP TABLE IF EXISTS patrimonio;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS estoque;
DROP TABLE IF EXISTS dados_dashboard;
DROP TABLE IF EXISTS localizacao;

-- Create the departamentos table
CREATE TABLE departamentos
(
    dep_id          INT AUTO_INCREMENT PRIMARY KEY,
    dep_nome        VARCHAR(50) NOT NULL,
    dep_descricao   VARCHAR(100) NOT NULL,
    dep_responsavel VARCHAR(50) NOT NULL,
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the departamentos table
INSERT INTO departamentos (dep_nome, dep_descricao, dep_responsavel, createdAt, updatedAt)
VALUES ('Departamento de TI', 'Responsável por gerenciar os recursos de tecnologia da informação da empresa.',
        'Elon Musk', '2024-04-22 14:21:48', '2024-04-22 14:21:48');

-- Create the usuarios table
CREATE TABLE usuarios
(
    usr_id            INT AUTO_INCREMENT PRIMARY KEY,
    usr_nome          VARCHAR(255) NOT NULL,
    usr_pass          VARCHAR(255) NOT NULL,
    usr_cargo         VARCHAR(255) NOT NULL,
    usr_dep           VARCHAR(255) NOT NULL,
    resetToken        VARCHAR(255)          DEFAULT NULL,
    resetTokenExpires TIMESTAMP             DEFAULT NULL,
    createdAt         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updatedAt         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into usuarios
    (usr_nome, usr_dep, usr_pass, usr_cargo, createdAt, updatedAt)
values ('admin', 'GOV', '$2b$10$iS/kpcc8pTnLPdvmAWFE6uHqjhEXnQgdVY1eoiR5V1Rohzk48W5.G',
        'Comum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create the cargos table
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

-- Create the cargo_usuario table
CREATE TABLE IF NOT EXISTS cargo_usuario
(
    usr_id   INT NOT NULL,
    cargo_id INT NOT NULL,
    FOREIGN KEY (usr_id) REFERENCES usuarios (usr_id),
    FOREIGN KEY (cargo_id) REFERENCES cargos (cargo_id),
    PRIMARY KEY (usr_id, cargo_id)
);

INSERT INTO cargo_usuario(usr_id, cargo_id)
values (1, 1);

-- Create the permissoes table
CREATE TABLE permissoes
(
    perm_id        INT AUTO_INCREMENT PRIMARY KEY,
    perm_nome      VARCHAR(30) not null,
    perm_descricao VARCHAR(30) not null,
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO permissoes (perm_id, perm_nome, perm_descricao, createdAt, updatedAt)
VALUES (1, 'adicionar_item', 'Permissão para adicionar item', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO permissoes (perm_id, perm_nome, perm_descricao, createdAt, updatedAt)
VALUES (2, 'editar_item', 'Permissão para editar item', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO permissoes (perm_id, perm_nome, perm_descricao, createdAt, updatedAt)
VALUES (3, 'excluir_item', 'Permissão para excluir item', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO permissoes (perm_id, perm_nome, perm_descricao, createdAt, updatedAt)
VALUES (4, 'visualizar_item', 'Permissão para visualizar item', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create the cargo_permissao table
CREATE TABLE IF NOT EXISTS cargo_permissao
(
#     id INT NOT NULL,
    cargo_id   INT NOT NULL,
    perm_id INT NOT NULL,
    FOREIGN KEY (cargo_id) REFERENCES cargos (cargo_id),
    FOREIGN KEY (perm_id) REFERENCES permissoes (perm_id),
    PRIMARY KEY (cargo_id, perm_id)
);

INSERT INTO cargo_permissao(cargo_id, perm_id)
values (1, 1);
INSERT INTO cargo_permissao(cargo_id, perm_id)
values (2, 2);
INSERT INTO cargo_permissao(cargo_id, perm_id)
values (3, 3);
INSERT INTO cargo_permissao(cargo_id, perm_id)
values (4, 4);

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
--
-- Insert data into the Fornecedores table
INSERT INTO fornecedores (for_nome, for_cnpj, for_telefone, for_email)
VALUES ('TechSupplies Ltda.', '12.345.678/0001-99', '(11) 98765-4321', 'contato@techsupplies.com');

-- Create the Localizacao table
CREATE TABLE localizacao
(
    loc_id          INT AUTO_INCREMENT PRIMARY KEY,
    loc_nome        VARCHAR(50) NOT NULL,
    loc_descricao   VARCHAR(100) NOT NULL,
    loc_responsavel VARCHAR(50) NOT NULL,
    createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the localizacao table
INSERT INTO localizacao (loc_nome, loc_descricao, loc_responsavel, createdAt, updatedAt)
VALUES ('Sala 301', 'Sala de reuniões no terceiro andar do prédio principal.', 'Jon Sudano', '2024-04-22 14:24:43',
        '2024-04-22 14:24:43');

-- Create the patrimonio table
CREATE TABLE patrimonio
(
    pat_id                INT AUTO_INCREMENT PRIMARY KEY,
    pat_for_id            INT    NOT NULL,
    pat_nome              VARCHAR(255)   NOT NULL,
    pat_tipo              VARCHAR(255)   NOT NULL,
    pat_data_aquisicao    TIMESTAMP           NOT NULL,
    pat_valor             DECIMAL(10, 2) NOT NULL,
    pat_estado            VARCHAR(50)    NOT NULL,
    pat_depreciacao_anual DECIMAL(5, 2)  NOT NULL,
    pat_vida_util         VARCHAR(50)    NOT NULL,
    createdAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pat_for_id) REFERENCES fornecedores (for_id)
);
--
-- Insert data into the patrimonio table
INSERT INTO patrimonio (pat_nome, pat_for_id, pat_tipo, pat_data_aquisicao, pat_valor, pat_estado,
                        pat_depreciacao_anual, pat_vida_util, createdAt, updatedAt)
VALUES ('Laptop Dell Inspiron 15', '1', 'Eletrônico', '2024-04-22 10:34:34', 3.5, 'novo', 1.32435, '5',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create the Estoque table
CREATE TABLE estoque
(
    estoque_id     INT AUTO_INCREMENT PRIMARY KEY,
    estoque_loc_id INT NOT NULL,
    createdAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (estoque_loc_id) REFERENCES localizacao (loc_id)
);

-- Insert data into the patrimonio table
INSERT INTO estoque (estoque_loc_id, createdAt, updatedAt)
VALUES (1, '2024-04-22 14:24:43', '2024-04-22 14:24:43');

-- Create the Estoque table
CREATE TABLE patrimonio_estoque
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    pat_id     INT NOT NULL,
    estoque_id INT NOT NULL,
    quantidade INT NOT NULL,
    createdAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pat_id) REFERENCES patrimonio (pat_id),
    FOREIGN KEY (estoque_id) REFERENCES estoque (estoque_id)

);

-- Insert data into the patrimonio table
INSERT INTO patrimonio_estoque (pat_id, estoque_id, quantidade, createdAt, updatedAt)
VALUES (1, 1, 3, '2024-04-22 14:24:43', '2024-04-22 14:24:43');

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
    updatedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mov_pat_id) REFERENCES patrimonio (pat_id),
    FOREIGN KEY (mov_loc_origem_id) REFERENCES localizacao (loc_id),
    FOREIGN KEY (mov_loc_destino_id) REFERENCES localizacao (loc_id)
);

-- Insert data into the departamentos table
INSERT INTO movimentacao (mov_pat_id, mov_loc_origem_id, mov_loc_destino_id, mov_responsavel, mov_tipo, createdAt, updatedAt)
VALUES (1, 1, 1, 'admin', 'Entrada', '2023-11-18 00:00:00', '2023-11-18 00:00:00');


-- Insert data into the dados_dashboard table
CREATE TABLE dados_dashboard
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
INSERT INTO dados_dashboard (valor_total, depreciacao_anual, taxa_depreciacao_anual, taxa_utilizacao, valor_liquido,
                              roi, pat_id, createdAt, updatedAt)
VALUES (10.2, 2.3, 0.2, 0.5, 8.9, 0.1, 1, '2021-11-18 00:00:00', '2021-11-18 00:00:00');
