/* synclabDTR(17-08-24): */

create database synclab;

use synclab;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataNasc DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    numero INT NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    idEndereco INT NOT NULL
);

CREATE TABLE Laboratorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomeLab VARCHAR(255) NOT NULL,
    status ENUM ("Ativo", "Desativado")
);

CREATE TABLE Requisicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM("Aceito","Recusado","Em Andamento") DEFAULT "Em Andamento",
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    idLab INT,
    matricula INT,
    idProjeto INT
);

CREATE TABLE Projeto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    dataCriacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM("Ativo","Desativado") DEFAULT "Ativo",
    descricao VARCHAR(1000) NOT NULL,
    tutor INT NOT NULL
);

CREATE TABLE Atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    status ENUM("Finalizada","Em andamento","Pausada") DEFAULT ("Pausada"),
    dataIni TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dataFim TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idProjeto INT NOT NULL
);

CREATE TABLE Endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataReserva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idLab INT NOT NULL,
    matricula INT NOT NULL
);

CREATE TABLE Matricula (
    matricula INT PRIMARY KEY,
    tipo TINYINT NOT NULL,
    idUsuario INT,
    status ENUM ("Ativo", "Desativado") DEFAULT "Ativo"
);

CREATE TABLE Participa (
    matricula INT NOT NULL,
    idAtividade INT NOT NULL
);

CREATE TABLE Integra (
    matricula INT,
    idProjeto INT
);

CREATE TABLE Req_Matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula INT NOT NULL,
    tipo TINYINT NOT NULL,
    idUsuario INT NOT NULL,
    status ENUM("Aceito", "Rejeitado","Em andamento") DEFAULT "Em andamento"
);

CREATE TABLE Req_Projeto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    status ENUM("Aceito","Rejeitado","Em andamento") DEFAULT "Em andamento"
);
 
ALTER TABLE Usuario ADD CONSTRAINT FK_Usuario_2
    FOREIGN KEY (idEndereco)
    REFERENCES Endereco (id);
 
ALTER TABLE Requisicao ADD CONSTRAINT FK_Requisicao_2
    FOREIGN KEY (idLab)
    REFERENCES Laboratorio (id)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao ADD CONSTRAINT FK_Requisicao_3
    FOREIGN KEY (matricula)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao ADD CONSTRAINT FK_Requisicao_4
    FOREIGN KEY (idProjeto)
    REFERENCES Projeto (id)
    ON DELETE CASCADE;
 
ALTER TABLE Projeto ADD CONSTRAINT FK_Projeto_2
    FOREIGN KEY (tutor)
    REFERENCES Matricula (matricula);
 
ALTER TABLE Atividade ADD CONSTRAINT FK_Atividade_2
    FOREIGN KEY (idProjeto)
    REFERENCES Projeto (id)
    ON DELETE CASCADE;
 
ALTER TABLE Reserva ADD CONSTRAINT FK_Reserva_2
    FOREIGN KEY (idLab)
    REFERENCES Laboratorio (id)
    ON DELETE CASCADE;
 
ALTER TABLE Reserva ADD CONSTRAINT FK_Reserva_3
    FOREIGN KEY (matricula)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE Matricula ADD CONSTRAINT FK_Matricula_2
    FOREIGN KEY (idUsuario)
    REFERENCES Usuario (id)
    ON DELETE CASCADE;
 
ALTER TABLE Participa ADD CONSTRAINT FK_Participa_1
    FOREIGN KEY (matricula)
    REFERENCES Matricula (matricula)
    ON DELETE RESTRICT;
 
ALTER TABLE Participa ADD CONSTRAINT FK_Participa_2
    FOREIGN KEY (idAtividade)
    REFERENCES Atividade (id)
    ON DELETE RESTRICT;
 
ALTER TABLE Integra ADD CONSTRAINT FK_Integra_1
    FOREIGN KEY (idProjeto)
    REFERENCES Projeto (id);
 
ALTER TABLE Integra ADD CONSTRAINT FK_Integra_2
    FOREIGN KEY (matricula)
    REFERENCES Matricula (matricula);
 
ALTER TABLE Req_Matricula ADD CONSTRAINT FK_Req_Matricula_2
    FOREIGN KEY (idUsuario)
    REFERENCES Usuario (id);
 
ALTER TABLE Req_Projeto ADD CONSTRAINT FK_Req_Projeto_2
    FOREIGN KEY (matricula)
    REFERENCES Matricula (matricula);