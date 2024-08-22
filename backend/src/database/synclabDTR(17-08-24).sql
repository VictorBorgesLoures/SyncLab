/* synclabDTR(17-08-24): */

CREATE TABLE Usuario (
    IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    dataNasc DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(255) NOT NULL
);

CREATE TABLE Laboratorio (
    idLab INT AUTO_INCREMENT PRIMARY KEY,
    nomeLab VARCHAR(255) NOT NULL
);

CREATE TABLE Requisicao (
    idRequisicao INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM("Aceito","Recusado","Em andamento") DEFAULT "Em andamento",
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    idLab INT,
    matricula INT,
    idProjeto INT
);

CREATE TABLE Projeto (
    idProjeto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    dataCriacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM("Ativo","Desativado") DEFAULT "Desativado",
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
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL,
    idUsuario INT NOT NULL
);

CREATE TABLE Reserva (
    IdReserva INT AUTO_INCREMENT PRIMARY KEY,
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
 
ALTER TABLE Requisicao ADD CONSTRAINT FK_Requisicao_2
    FOREIGN KEY (idLab)
    REFERENCES Laboratorio (idLab)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao ADD CONSTRAINT FK_Requisicao_3
    FOREIGN KEY (matricula)
    REFERENCES Usuario (IdUsuario)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao ADD CONSTRAINT FK_Requisicao_4
    FOREIGN KEY (idProjeto)
    REFERENCES Projeto (idProjeto)
    ON DELETE CASCADE;
 
ALTER TABLE Projeto ADD CONSTRAINT FK_Projeto_2
    FOREIGN KEY (tutor)
    REFERENCES Matricula (matricula);
 
ALTER TABLE Atividade ADD CONSTRAINT FK_Atividade_2
    FOREIGN KEY (idProjeto)
    REFERENCES Projeto (idProjeto)
    ON DELETE CASCADE;
 
ALTER TABLE Endereco ADD CONSTRAINT FK_Endereco_2
    FOREIGN KEY (idUsuario)
    REFERENCES Usuario (IdUsuario)
    ON DELETE RESTRICT;
 
ALTER TABLE Reserva ADD CONSTRAINT FK_Reserva_2
    FOREIGN KEY (idLab)
    REFERENCES Laboratorio (idLab)
    ON DELETE CASCADE;
 
ALTER TABLE Reserva ADD CONSTRAINT FK_Reserva_3
    FOREIGN KEY (matricula)
    REFERENCES Usuario (IdUsuario)
    ON DELETE CASCADE;
 
ALTER TABLE Matricula ADD CONSTRAINT FK_Matricula_2
    FOREIGN KEY (idUsuario)
    REFERENCES Usuario (IdUsuario)
    ON DELETE CASCADE;
 
ALTER TABLE Participa ADD CONSTRAINT FK_Participa_1
    FOREIGN KEY (matricula)
    REFERENCES Matricula (matricula)
    ON DELETE RESTRICT;
 
ALTER TABLE Participa ADD CONSTRAINT FK_Participa_2
    FOREIGN KEY (idAtividade)
    REFERENCES Atividade (id)
    ON DELETE SET NULL;
 
ALTER TABLE Integra ADD CONSTRAINT FK_Integra_1
    FOREIGN KEY (idProjeto)
    REFERENCES Projeto (idProjeto);
 
ALTER TABLE Integra ADD CONSTRAINT FK_Integra_2
    FOREIGN KEY (matricula)
    REFERENCES Matricula (matricula);
 
ALTER TABLE Req_Matricula ADD CONSTRAINT FK_Req_Matricula_2
    FOREIGN KEY (idUsuario)
    REFERENCES Usuario (IdUsuario);
 
ALTER TABLE Req_Projeto ADD CONSTRAINT FK_Req_Projeto_2
    FOREIGN KEY (matricula)
    REFERENCES Matricula (matricula);