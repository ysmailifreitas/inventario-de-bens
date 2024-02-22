USE inventario;

DROP TABLE IF EXISTS role_assignments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS dados_dashboards;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS itens;

CREATE TABLE users
(
    id                INT AUTO_INCREMENT PRIMARY KEY,
    username          VARCHAR(255) NOT NULL DEFAULT 'admin',
    company_email     VARCHAR(255) NOT NULL DEFAULT 'example@example.com',
    password          VARCHAR(255) NOT NULL DEFAULT '$2b$10$KeWip07yeZcurqQKAUv3ouVwbNFzM0WvaTwAG9zX7OkPceKghSoxu',
    company_name      VARCHAR(255) NOT NULL DEFAULT 'default_company_name',
    cnpj              VARCHAR(255) NOT NULL DEFAULT 'default_cnpj',
    address           VARCHAR(255) NOT NULL DEFAULT 'default_address',
    fullname          VARCHAR(255) NOT NULL DEFAULT 'default_fullname',
    tipo_permissao    VARCHAR(255) NOT NULL DEFAULT 'Comum',
    resetToken        VARCHAR(255)          DEFAULT NULL,
    resetTokenExpires TIMESTAMP             DEFAULT NULL,
    createdAt         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updatedAt         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into users
(id, username, company_email, password, company_name, cnpj, address, fullname, tipo_permissao, createdAt, updatedAt)
values ('1', 'admin', 'comp@email', '$2b$10$iS/kpcc8pTnLPdvmAWFE6uHqjhEXnQgdVY1eoiR5V1Rohzk48W5.G', 'comp',
        '0932093209000123', 'rua charlote', 'admino', 'Comum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE roles
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    role      VARCHAR(30) not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into roles(id, role, createdAt, updatedAt)
values (2, 'Administrador', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into roles(id, role, createdAt, updatedAt)
values (1, 'Gestor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into roles(id, role, createdAt, updatedAt)
values (3, 'Supervisor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into roles(id, role, createdAt, updatedAt)
values (4, 'Comum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create the role-assignments table
CREATE TABLE role_assignments
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    user_id   INT NOT NULL,
    role_id   INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- Insert data into the role-assignments table
INSERT INTO role_assignments (user_id, role_id)
VALUES (1, 1);

-- Create the Fornecedor table
CREATE TABLE fornecedores
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    for_nome     VARCHAR(255) NOT NULL,
    for_telefone VARCHAR(15)  NOT NULL,
    for_email    VARCHAR(255) NOT NULL,
    createdAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the Fornecedor table
INSERT INTO fornecedores (for_nome, for_telefone, for_email)
VALUES ('Exemplo Fornecedor', '67995542871', 'example@gmail.com');

-- Create the Item table
CREATE TABLE itens
(
    id                    INT AUTO_INCREMENT PRIMARY KEY,
    it_nome               VARCHAR(255)   NOT NULL,
    it_quantidade         INT            NOT NULL,
    it_dataAquisicao      DATE           NOT NULL,
    it_preco_unitario     DECIMAL(10, 2) NOT NULL,
    it_valor_total        DECIMAL(10, 2) NOT NULL,
    it_depreciacao_anual  DECIMAL(5, 2)  NOT NULL,
    for_id                VARCHAR(50)    NOT NULL,
    it_for_nome           VARCHAR(255)   NOT NULL,
    it_categoria          VARCHAR(255)   NOT NULL,
    it_descricao          TEXT           NOT NULL,
    it_localizacao        VARCHAR(255)   NOT NULL,
    it_valor_compra       DECIMAL(10, 2) NOT NULL,
    it_valor_venda        DECIMAL(10, 2) NOT NULL,
    it_estado_conservacao VARCHAR(50)    NOT NULL,
    createdAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data into the Item table
INSERT INTO itens (it_nome, it_quantidade, it_dataAquisicao, it_preco_unitario, it_valor_total, it_depreciacao_anual,
                   for_id, it_for_nome, it_categoria, it_descricao, it_localizacao, it_valor_compra, it_valor_venda,
                   it_estado_conservacao, createdAt, updatedAt)
VALUES ('Exemplo Item', 10, '2023-11-18', 19.99, 199.90, 5.0, 'fornecedor123', 'Fornecedor XYZ', 'Eletrônicos',
        'Um exemplo de item', 'Sala 101', 150.00, 249.99, 'Bom', '2021-11-18 00:00:00', '2021-11-18 00:00:00');

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
    item_id                INT,
    FOREIGN KEY (item_id) REFERENCES itens (id),
    createdAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt              TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO dados_dashboards (valor_total, depreciacao_anual, taxa_depreciacao_anual, taxa_utilizacao, valor_liquido,
                              roi, item_id, createdAt, updatedAt)
VALUES (10.2, 2.3, 0.2, 0.5, 8.9, 0.1, 1, '2021-11-18 00:00:00', '2021-11-18 00:00:00');
