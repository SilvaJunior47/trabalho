DROP DATABASE IF EXISTS desafio;
CREATE DATABASE desafio;
USE desafio;

-- Tabela de clientes
CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    idade INT NOT NULL
);

-- Dados iniciais de clientes
INSERT INTO clientes (nome, sobrenome, email, idade) VALUES
('João', 'Silva', 'joao@email.com', 30),
('Maria', 'Souza', 'maria@email.com', 25);

-- Tabela de produtos
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    data_atualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dados iniciais de produtos
INSERT INTO produtos (nome, descricao, preco) VALUES
('Notebook', 'Notebook Gamer Dell', 4500.00),
('Mouse', 'Mouse sem fio Logitech', 120.00);
