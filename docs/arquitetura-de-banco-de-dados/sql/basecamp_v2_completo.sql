-- BaseCamp - banco revisado de 16 tabelas
-- Equipe: Escoteiros do BOB | Revisao: 19/10/2026
-- Destino: basecamp_v2. Nao apaga nem migra o banco anterior.
-- Executar em banco novo. Uma segunda importacao encontra tabelas/IDs existentes.
-- MariaDB 10.4+ / MySQL 8.0.16+; InnoDB; UTF-8 (utf8mb4).
-- PK = identifica o registro; FK = referencia outra tabela;
-- UNIQUE = impede valores ou combinacoes repetidos; CHECK = restringe valores.
-- Regras de perfil/secao/prazo precisam ser validadas nas operacoes da aplicacao.
SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS basecamp_v2
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE basecamp_v2;

-- grupo
CREATE TABLE `grupo` (
  `id_grupo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `apresentacao` TEXT NOT NULL,
  `historia` TEXT NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `telefone` VARCHAR(25) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ramo
CREATE TABLE `ramo` (
  `id_ramo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `descricao` TEXT NOT NULL,
  PRIMARY KEY (`id_ramo`),
  CONSTRAINT `uq_ramo_1` UNIQUE (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- perfil
CREATE TABLE `perfil` (
  `id_perfil` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(30) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_perfil`),
  CONSTRAINT `uq_perfil_1` UNIQUE (`nome`),
  CONSTRAINT `ck_perfil_nome` CHECK (nome IN ('escoteiro','chefe','administrador'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- usuario
CREATE TABLE `usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `telefone` VARCHAR(25) NULL,
  `foto` VARCHAR(500) NULL,
  `ativo` BOOLEAN NOT NULL DEFAULT 1,
  `criado_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `uq_usuario_1` UNIQUE (`email`),
  CONSTRAINT `ck_usuario_ativo` CHECK (ativo IN (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- login
CREATE TABLE `login` (
  `id_login` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `identificador` VARCHAR(254) NOT NULL,
  `senha_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_login`),
  CONSTRAINT `uq_login_1` UNIQUE (`id_usuario`),
  CONSTRAINT `uq_login_2` UNIQUE (`identificador`),
  CONSTRAINT `fk_login_id_usuario` FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- usuario_perfil
CREATE TABLE `usuario_perfil` (
  `id_usuario` INT NOT NULL,
  `id_perfil` INT NOT NULL,
  `data_atribuicao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`, `id_perfil`),
  CONSTRAINT `fk_usuario_perfil_id_usuario` FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_usuario_perfil_id_perfil` FOREIGN KEY (`id_perfil`)
    REFERENCES `perfil` (`id_perfil`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- secao
CREATE TABLE `secao` (
  `id_secao` INT NOT NULL AUTO_INCREMENT,
  `id_grupo` INT NOT NULL,
  `id_ramo` INT NOT NULL,
  `id_chefe` INT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `situacao` VARCHAR(10) NOT NULL DEFAULT 'ativa',
  PRIMARY KEY (`id_secao`),
  CONSTRAINT `fk_secao_id_grupo` FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo` (`id_grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_secao_id_ramo` FOREIGN KEY (`id_ramo`)
    REFERENCES `ramo` (`id_ramo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_secao_id_chefe` FOREIGN KEY (`id_chefe`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_secao_situacao` CHECK (situacao IN ('ativa','inativa'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- integrante
CREATE TABLE `integrante` (
  `id_integrante` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_secao` INT NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `data_ingresso` DATE NOT NULL,
  `situacao` VARCHAR(10) NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`id_integrante`),
  CONSTRAINT `uq_integrante_1` UNIQUE (`id_usuario`),
  CONSTRAINT `fk_integrante_id_usuario` FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_integrante_id_secao` FOREIGN KEY (`id_secao`)
    REFERENCES `secao` (`id_secao`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_integrante_situacao` CHECK (situacao IN ('ativo','inativo'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- atividade
CREATE TABLE `atividade` (
  `id_atividade` INT NOT NULL AUTO_INCREMENT,
  `id_secao` INT NOT NULL,
  `titulo` VARCHAR(150) NOT NULL,
  `descricao` TEXT NOT NULL,
  `inicio` DATETIME NOT NULL,
  `termino` DATETIME NOT NULL,
  `local` VARCHAR(255) NOT NULL,
  `situacao` VARCHAR(12) NOT NULL DEFAULT 'programada',
  PRIMARY KEY (`id_atividade`),
  CONSTRAINT `fk_atividade_id_secao` FOREIGN KEY (`id_secao`)
    REFERENCES `secao` (`id_secao`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_atividade_situacao` CHECK (situacao IN ('programada','concluida','cancelada')),
  CONSTRAINT `ck_atividade_datas` CHECK (termino >= inicio),
  INDEX `ix_atividade_1` (`id_secao`, `inicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- conquista
CREATE TABLE `conquista` (
  `id_conquista` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `descricao` TEXT NOT NULL,
  `criterios` TEXT NOT NULL,
  PRIMARY KEY (`id_conquista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- participacao
CREATE TABLE `participacao` (
  `id_participacao` INT NOT NULL AUTO_INCREMENT,
  `id_integrante` INT NOT NULL,
  `id_atividade` INT NOT NULL,
  `data_inscricao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `situacao_inscricao` VARCHAR(10) NOT NULL DEFAULT 'inscrita',
  `data_cancelamento` DATETIME NULL,
  `presenca` VARCHAR(10) NOT NULL DEFAULT 'pendente',
  `observacao` TEXT NULL,
  PRIMARY KEY (`id_participacao`),
  CONSTRAINT `uq_participacao_1` UNIQUE (`id_integrante`, `id_atividade`),
  CONSTRAINT `fk_participacao_id_integrante` FOREIGN KEY (`id_integrante`)
    REFERENCES `integrante` (`id_integrante`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_participacao_id_atividade` FOREIGN KEY (`id_atividade`)
    REFERENCES `atividade` (`id_atividade`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_participacao_situacao` CHECK (situacao_inscricao IN ('inscrita','cancelada')),
  CONSTRAINT `ck_participacao_presenca` CHECK (presenca IN ('pendente','presente','ausente')),
  CONSTRAINT `ck_participacao_cancelamento` CHECK ((situacao_inscricao = 'inscrita' AND data_cancelamento IS NULL) OR (situacao_inscricao = 'cancelada' AND data_cancelamento IS NOT NULL AND data_cancelamento >= data_inscricao)),
  CONSTRAINT `ck_participacao_cancelada_pendente` CHECK (situacao_inscricao <> 'cancelada' OR presenca = 'pendente')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- integrante_conquista
CREATE TABLE `integrante_conquista` (
  `id_integrante_conquista` INT NOT NULL AUTO_INCREMENT,
  `id_integrante` INT NOT NULL,
  `id_conquista` INT NOT NULL,
  `concedido_por` INT NOT NULL,
  `data_concessao` DATE NOT NULL,
  `observacao` TEXT NULL,
  PRIMARY KEY (`id_integrante_conquista`),
  CONSTRAINT `uq_integrante_conquista_1` UNIQUE (`id_integrante`, `id_conquista`),
  CONSTRAINT `fk_integrante_conquista_id_integrante` FOREIGN KEY (`id_integrante`)
    REFERENCES `integrante` (`id_integrante`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_integrante_conquista_id_conquista` FOREIGN KEY (`id_conquista`)
    REFERENCES `conquista` (`id_conquista`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_integrante_conquista_concedido_por` FOREIGN KEY (`concedido_por`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- aviso
CREATE TABLE `aviso` (
  `id_aviso` INT NOT NULL AUTO_INCREMENT,
  `id_grupo` INT NOT NULL,
  `id_secao` INT NULL,
  `autor` INT NOT NULL,
  `titulo` VARCHAR(150) NOT NULL,
  `mensagem` TEXT NOT NULL,
  `publicado_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `visibilidade` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_aviso`),
  CONSTRAINT `fk_aviso_id_grupo` FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo` (`id_grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_aviso_id_secao` FOREIGN KEY (`id_secao`)
    REFERENCES `secao` (`id_secao`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_aviso_autor` FOREIGN KEY (`autor`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_aviso_visibilidade` CHECK (visibilidade IN ('publica','grupo','secao')),
  CONSTRAINT `ck_aviso_destino` CHECK ((visibilidade = 'secao' AND id_secao IS NOT NULL) OR (visibilidade IN ('publica','grupo') AND id_secao IS NULL)),
  INDEX `ix_aviso_1` (`visibilidade`, `publicado_em`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- evento
CREATE TABLE `evento` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `id_grupo` INT NOT NULL,
  `id_secao` INT NULL,
  `criado_por` INT NOT NULL,
  `titulo` VARCHAR(150) NOT NULL,
  `descricao` TEXT NOT NULL,
  `inicio` DATETIME NOT NULL,
  `termino` DATETIME NOT NULL,
  `local` VARCHAR(255) NOT NULL,
  `situacao` VARCHAR(10) NOT NULL DEFAULT 'programado',
  `visibilidade` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_evento`),
  CONSTRAINT `fk_evento_id_grupo` FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo` (`id_grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_evento_id_secao` FOREIGN KEY (`id_secao`)
    REFERENCES `secao` (`id_secao`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_evento_criado_por` FOREIGN KEY (`criado_por`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_evento_situacao` CHECK (situacao IN ('programado','concluido','cancelado')),
  CONSTRAINT `ck_evento_datas` CHECK (termino >= inicio),
  CONSTRAINT `ck_evento_visibilidade` CHECK (visibilidade IN ('publica','grupo','secao')),
  CONSTRAINT `ck_evento_destino` CHECK ((visibilidade = 'secao' AND id_secao IS NOT NULL) OR (visibilidade IN ('publica','grupo') AND id_secao IS NULL)),
  INDEX `ix_evento_1` (`visibilidade`, `inicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pergunta_frequente
CREATE TABLE `pergunta_frequente` (
  `id_pergunta` INT NOT NULL AUTO_INCREMENT,
  `id_grupo` INT NOT NULL,
  `mantida_por` INT NOT NULL,
  `pergunta` VARCHAR(255) NOT NULL,
  `resposta` TEXT NOT NULL,
  `ordem_exibicao` INT NOT NULL DEFAULT 0,
  `ativa` BOOLEAN NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_pergunta`),
  CONSTRAINT `fk_pergunta_frequente_id_grupo` FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo` (`id_grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_pergunta_frequente_mantida_por` FOREIGN KEY (`mantida_por`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_faq_ativa` CHECK (ativa IN (0,1)),
  CONSTRAINT `ck_faq_ordem` CHECK (ordem_exibicao >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- movimentacao_financeira
CREATE TABLE `movimentacao_financeira` (
  `id_movimentacao` INT NOT NULL AUTO_INCREMENT,
  `id_grupo` INT NOT NULL,
  `registrado_por` INT NOT NULL,
  `tipo` VARCHAR(7) NOT NULL,
  `valor` DECIMAL(12,2) NOT NULL,
  `data` DATE NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_movimentacao`),
  CONSTRAINT `fk_movimentacao_financeira_id_grupo` FOREIGN KEY (`id_grupo`)
    REFERENCES `grupo` (`id_grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_movimentacao_financeira_registrado_por` FOREIGN KEY (`registrado_por`)
    REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_mov_tipo` CHECK (tipo IN ('entrada','saida')),
  CONSTRAINT `ck_mov_valor` CHECK (valor > 0),
  INDEX `ix_movimentacao_financeira_1` (`data`, `tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Dados inteiramente ficticios. Contas locais: usuario1@basecamp.example ... usuario10@basecamp.example
-- Senha de demonstracao: BaseCamp@2026 (armazenada somente como hash bcrypt).
-- Estes registros nao implementam a tela/API de autenticacao.
SET NAMES utf8mb4;
USE basecamp_v2;
START TRANSACTION;

INSERT INTO `grupo` (`id_grupo`, `nome`, `apresentacao`, `historia`, `email`, `telefone`, `endereco`) VALUES
  (1, 'Grupo Escoteiro BaseCamp', 'Grupo fictício usado na demonstração acadêmica.', 'História demonstrativa do grupo escoteiro.', 'contato@basecamp.example', '41999990000', 'Contenda - PR (endereço fictício)');

INSERT INTO `ramo` (`id_ramo`, `nome`, `descricao`) VALUES
  (1, 'Lobinho', 'Ramo lobinho'),
  (2, 'Escoteiro', 'Ramo escoteiro'),
  (3, 'Sênior', 'Ramo sênior'),
  (4, 'Pioneiro', 'Ramo pioneiro');

INSERT INTO `perfil` (`id_perfil`, `nome`, `descricao`) VALUES
  (1, 'administrador', 'Administração geral do grupo'),
  (2, 'chefe', 'Gestão das seções sob sua responsabilidade'),
  (3, 'escoteiro', 'Consulta pessoal e inscrições autorizadas');

INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `telefone`, `foto`, `ativo`, `criado_em`) VALUES
  (1, 'Ana Administradora', 'usuario1@basecamp.example', '41990000001', NULL, 1, '2026-10-01 09:00:00'),
  (2, 'Bruno Chefe', 'usuario2@basecamp.example', '41990000002', NULL, 1, '2026-10-01 09:00:00'),
  (3, 'Carla Chefe', 'usuario3@basecamp.example', NULL, NULL, 1, '2026-10-01 09:00:00'),
  (4, 'Daniel Jovem', 'usuario4@basecamp.example', '41990000004', NULL, 1, '2026-10-01 09:00:00'),
  (5, 'Elisa Jovem', 'usuario5@basecamp.example', '41990000005', NULL, 1, '2026-10-01 09:00:00'),
  (6, 'Felipe Jovem', 'usuario6@basecamp.example', NULL, NULL, 1, '2026-10-01 09:00:00'),
  (7, 'Gabriela Jovem', 'usuario7@basecamp.example', '41990000007', NULL, 1, '2026-10-01 09:00:00'),
  (8, 'Henrique Jovem', 'usuario8@basecamp.example', '41990000008', NULL, 1, '2026-10-01 09:00:00'),
  (9, 'Isabela Jovem', 'usuario9@basecamp.example', NULL, NULL, 1, '2026-10-01 09:00:00'),
  (10, 'João Administrador e Chefe', 'usuario10@basecamp.example', '41990000010', NULL, 1, '2026-10-01 09:00:00');

INSERT INTO `login` (`id_login`, `id_usuario`, `identificador`, `senha_hash`) VALUES
  (1, 1, 'usuario1@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (2, 2, 'usuario2@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (3, 3, 'usuario3@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (4, 4, 'usuario4@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (5, 5, 'usuario5@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (6, 6, 'usuario6@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (7, 7, 'usuario7@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (8, 8, 'usuario8@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (9, 9, 'usuario9@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa'),
  (10, 10, 'usuario10@basecamp.example', '$2b$12$TSHHKymohHzLf5.8JHwfWelrUtnC1yngvLXel2osKjUzYLYZPGkCa');

INSERT INTO `usuario_perfil` (`id_usuario`, `id_perfil`, `data_atribuicao`) VALUES
  (1, 1, '2026-10-01 09:00:00'),
  (2, 2, '2026-10-01 09:00:00'),
  (3, 2, '2026-10-01 09:00:00'),
  (4, 3, '2026-10-01 09:00:00'),
  (5, 3, '2026-10-01 09:00:00'),
  (6, 3, '2026-10-01 09:00:00'),
  (7, 3, '2026-10-01 09:00:00'),
  (8, 3, '2026-10-01 09:00:00'),
  (9, 3, '2026-10-01 09:00:00'),
  (10, 1, '2026-10-01 09:00:00'),
  (10, 2, '2026-10-01 09:00:00');

INSERT INTO `secao` (`id_secao`, `id_grupo`, `id_ramo`, `id_chefe`, `nome`, `situacao`) VALUES
  (1, 1, 1, 2, 'Alcateia Horizonte', 'ativa'),
  (2, 1, 2, 3, 'Tropa Aurora', 'ativa'),
  (3, 1, 3, 10, 'Tropa Serra', 'ativa'),
  (4, 1, 4, NULL, 'Clã Caminho', 'inativa');

INSERT INTO `integrante` (`id_integrante`, `id_usuario`, `id_secao`, `data_nascimento`, `data_ingresso`, `situacao`) VALUES
  (1, 4, 1, '2015-03-15', '2026-09-01', 'ativo'),
  (2, 5, 1, '2014-03-15', '2026-09-01', 'ativo'),
  (3, 6, 2, '2013-03-15', '2026-09-01', 'ativo'),
  (4, 7, 2, '2012-03-15', '2026-09-01', 'ativo'),
  (5, 8, 3, '2011-03-15', '2026-09-01', 'ativo'),
  (6, 9, 3, '2010-03-15', '2026-09-01', 'ativo');

INSERT INTO `atividade` (`id_atividade`, `id_secao`, `titulo`, `descricao`, `inicio`, `termino`, `local`, `situacao`) VALUES
  (1, 1, 'Trilha orientada', 'Orientação e cuidados com o ambiente.', '2026-10-17 09:00:00', '2026-10-17 12:00:00', 'Parque municipal', 'concluida'),
  (2, 2, 'Primeiros socorros', 'Práticas básicas de atendimento.', '2026-10-17 14:00:00', '2026-10-17 17:00:00', 'Sede do grupo', 'concluida'),
  (3, 3, 'Acampamento de seção', 'Planejamento e cooperação.', '2026-10-17 08:00:00', '2026-10-18 12:00:00', 'Campo escola', 'concluida'),
  (4, 1, 'Oficina de nós', 'Nós básicos e trabalho em equipe.', '2026-11-07 09:00:00', '2026-11-07 12:00:00', 'Sede do grupo', 'programada'),
  (5, 2, 'Mutirão ambiental', 'Limpeza e educação ambiental.', '2026-11-07 14:00:00', '2026-11-07 17:00:00', 'Parque municipal', 'programada'),
  (6, 3, 'Caminhada de integração', 'Atividade cancelada para demonstrar situação.', '2026-11-14 08:00:00', '2026-11-14 12:00:00', 'Trilha municipal', 'cancelada');

INSERT INTO `conquista` (`id_conquista`, `nome`, `descricao`, `criterios`) VALUES
  (1, 'Orientação básica', 'Uso inicial de mapas.', 'Demonstrar leitura de mapa e identificação de direções.'),
  (2, 'Primeiros socorros', 'Cuidados iniciais em situações simples.', 'Demonstrar os procedimentos orientados pelo chefe.'),
  (3, 'Vida em equipe', 'Cooperação em atividades.', 'Participar e colaborar na atividade de seção.'),
  (4, 'Nós básicos', 'Conhecimento de nós.', 'Executar os nós solicitados com segurança.'),
  (5, 'Consciência ambiental', 'Cuidado com o ambiente.', 'Participar de ação ambiental e explicar seu objetivo.');

INSERT INTO `participacao` (`id_participacao`, `id_integrante`, `id_atividade`, `data_inscricao`, `situacao_inscricao`, `data_cancelamento`, `presenca`, `observacao`) VALUES
  (1, 1, 1, '2026-10-10 10:00:00', 'inscrita', NULL, 'presente', NULL),
  (2, 2, 1, '2026-10-10 10:10:00', 'inscrita', NULL, 'ausente', 'Ausência informada.'),
  (3, 3, 2, '2026-10-10 10:20:00', 'inscrita', NULL, 'presente', NULL),
  (4, 4, 2, '2026-10-10 10:30:00', 'inscrita', NULL, 'presente', NULL),
  (5, 5, 3, '2026-10-10 10:40:00', 'inscrita', NULL, 'presente', NULL),
  (6, 6, 3, '2026-10-10 10:50:00', 'inscrita', NULL, 'presente', NULL),
  (7, 1, 4, '2026-10-19 14:00:00', 'inscrita', NULL, 'pendente', NULL),
  (8, 2, 4, '2026-10-19 14:10:00', 'cancelada', '2026-10-19 15:00:00', 'pendente', 'Cancelamento solicitado pelo integrante.');

INSERT INTO `integrante_conquista` (`id_integrante_conquista`, `id_integrante`, `id_conquista`, `concedido_por`, `data_concessao`, `observacao`) VALUES
  (1, 1, 1, 2, '2026-10-17', NULL),
  (2, 3, 2, 3, '2026-10-17', 'Procedimentos demonstrados.'),
  (3, 4, 2, 3, '2026-10-17', NULL),
  (4, 5, 3, 10, '2026-10-18', NULL),
  (5, 6, 3, 10, '2026-10-18', NULL),
  (6, 1, 3, 1, '2026-10-18', 'Concessão pelo administrador.');

INSERT INTO `aviso` (`id_aviso`, `id_grupo`, `id_secao`, `autor`, `titulo`, `mensagem`, `publicado_em`, `visibilidade`) VALUES
  (1, 1, NULL, 1, 'Conheça nosso grupo', 'Informações para visitantes.', '2026-10-19 09:00:00', 'publica'),
  (2, 1, NULL, 1, 'Reunião do grupo', 'Aviso interno para membros.', '2026-10-19 10:00:00', 'grupo'),
  (3, 1, 1, 2, 'Material para oficina', 'Levar corda para a atividade.', '2026-10-19 11:00:00', 'secao'),
  (4, 1, 2, 3, 'Preparação do mutirão', 'Orientações para a Tropa Aurora.', '2026-10-19 12:00:00', 'secao'),
  (5, 1, 3, 10, 'Reunião da Tropa Serra', 'Planejamento da próxima atividade.', '2026-10-19 13:00:00', 'secao');

INSERT INTO `evento` (`id_evento`, `id_grupo`, `id_secao`, `criado_por`, `titulo`, `descricao`, `inicio`, `termino`, `local`, `situacao`, `visibilidade`) VALUES
  (1, 1, NULL, 1, 'Apresentação aberta', 'Encontro informativo para visitantes.', '2026-11-01 10:00:00', '2026-11-01 12:00:00', 'Sede do grupo', 'programado', 'publica'),
  (2, 1, NULL, 1, 'Reunião geral', 'Organização interna.', '2026-11-02 19:00:00', '2026-11-02 20:00:00', 'Sede do grupo', 'programado', 'grupo'),
  (3, 1, 1, 2, 'Reunião da alcateia', 'Compromisso informativo de seção.', '2026-11-03 18:00:00', '2026-11-03 19:00:00', 'Sede do grupo', 'programado', 'secao'),
  (4, 1, 2, 3, 'Encontro da tropa', 'Compromisso informativo de seção.', '2026-11-04 18:00:00', '2026-11-04 19:00:00', 'Sede do grupo', 'programado', 'secao'),
  (5, 1, 3, 10, 'Planejamento sênior', 'Compromisso informativo de seção.', '2026-11-05 18:00:00', '2026-11-05 19:00:00', 'Sede do grupo', 'programado', 'secao');

INSERT INTO `pergunta_frequente` (`id_pergunta`, `id_grupo`, `mantida_por`, `pergunta`, `resposta`, `ordem_exibicao`, `ativa`) VALUES
  (1, 1, 1, 'Como conhecer o grupo?', 'Consulte os contatos e os eventos públicos.', 1, 1),
  (2, 1, 1, 'Onde acontecem os encontros?', 'Consulte o endereço e as orientações da atividade.', 2, 1),
  (3, 1, 1, 'Como consultar as atividades?', 'Integrantes acessam a área interna com sua conta.', 3, 1),
  (4, 1, 1, 'Como consultar minhas conquistas?', 'Acesse seu histórico na área interna.', 4, 1),
  (5, 1, 1, 'Como falar com o grupo?', 'Use os contatos apresentados na página institucional.', 5, 1);

INSERT INTO `movimentacao_financeira` (`id_movimentacao`, `id_grupo`, `registrado_por`, `tipo`, `valor`, `data`, `descricao`) VALUES
  (1, 1, 1, 'entrada', 500.0, '2026-10-01', 'Contribuições do grupo'),
  (2, 1, 1, 'saida', 120.0, '2026-10-03', 'Compra de materiais'),
  (3, 1, 10, 'entrada', 300.0, '2026-10-05', 'Doação fictícia'),
  (4, 1, 10, 'saida', 80.0, '2026-10-08', 'Manutenção da sede'),
  (5, 1, 1, 'entrada', 150.0, '2026-10-12', 'Campanha interna'),
  (6, 1, 1, 'saida', 50.0, '2026-10-17', 'Materiais de atividade');

COMMIT;

-- BaseCamp - tres relatorios com INNER JOIN.
USE basecamp_v2;

-- 1. Usuarios e seus perfis de acesso.
-- Nome, e-mail, perfil e data de atribuicao. Quem possui dois perfis aparece duas vezes.
-- Usuarios sem perfil nao aparecem; nao exibe hashes de senha.
SELECT u.nome AS usuario, u.email, p.nome AS perfil, up.data_atribuicao
FROM usuario AS u
INNER JOIN usuario_perfil AS up ON up.id_usuario = u.id_usuario
INNER JOIN perfil AS p ON p.id_perfil = up.id_perfil
ORDER BY u.nome, p.nome;

-- 2. Participantes das atividades.
-- Mostra grupo, secao DA ATIVIDADE, atividade, integrante, inscricao e presenca.
-- Preserva o historico mesmo se o integrante mudar de secao.
-- Inclui inscricoes canceladas, explicitamente identificadas; atividades sem vinculos nao aparecem.
SELECT g.nome AS grupo, s.nome AS secao_da_atividade, a.titulo AS atividade,
       a.inicio, a.situacao AS situacao_atividade, u.nome AS integrante,
       pa.situacao_inscricao, pa.presenca, pa.data_inscricao, pa.observacao
FROM participacao AS pa
INNER JOIN atividade AS a ON a.id_atividade = pa.id_atividade
INNER JOIN secao AS s ON s.id_secao = a.id_secao
INNER JOIN grupo AS g ON g.id_grupo = s.id_grupo
INNER JOIN integrante AS i ON i.id_integrante = pa.id_integrante
INNER JOIN usuario AS u ON u.id_usuario = i.id_usuario
ORDER BY a.inicio, a.id_atividade, u.nome;

-- 3. Conquistas obtidas pelos integrantes.
-- Mostra integrante, conquista, criterios, data, responsavel e observacao da concessao.
-- Somente integrantes com conquistas registradas aparecem.
SELECT u.nome AS integrante, c.nome AS conquista, c.criterios,
       ic.data_concessao, concedente.nome AS concedido_por, ic.observacao
FROM integrante_conquista AS ic
INNER JOIN integrante AS i ON i.id_integrante = ic.id_integrante
INNER JOIN usuario AS u ON u.id_usuario = i.id_usuario
INNER JOIN conquista AS c ON c.id_conquista = ic.id_conquista
INNER JOIN usuario AS concedente ON concedente.id_usuario = ic.concedido_por
ORDER BY u.nome, ic.data_concessao, c.nome;

-- Consultas de verificacao: somente leitura, nao alteram dados.
USE basecamp_v2;
SELECT VERSION() AS versao_servidor;
SELECT COUNT(*) AS total_tabelas
FROM information_schema.tables
WHERE table_schema = DATABASE() AND table_type = 'BASE TABLE';
-- Esperado em banco novo: 16 tabelas, 16 PK, 24 FK e 8 UNIQUE.
SELECT constraint_type, COUNT(*) AS quantidade
FROM information_schema.table_constraints
WHERE constraint_schema = DATABASE()
GROUP BY constraint_type ORDER BY constraint_type;

-- Esperado: cada tabela preenchida (quantidades diferentes refletem o dominio).
SELECT 'grupo' AS tabela, COUNT(*) AS registros FROM `grupo`
UNION ALL
SELECT 'ramo' AS tabela, COUNT(*) AS registros FROM `ramo`
UNION ALL
SELECT 'perfil' AS tabela, COUNT(*) AS registros FROM `perfil`
UNION ALL
SELECT 'usuario' AS tabela, COUNT(*) AS registros FROM `usuario`
UNION ALL
SELECT 'login' AS tabela, COUNT(*) AS registros FROM `login`
UNION ALL
SELECT 'usuario_perfil' AS tabela, COUNT(*) AS registros FROM `usuario_perfil`
UNION ALL
SELECT 'secao' AS tabela, COUNT(*) AS registros FROM `secao`
UNION ALL
SELECT 'integrante' AS tabela, COUNT(*) AS registros FROM `integrante`
UNION ALL
SELECT 'atividade' AS tabela, COUNT(*) AS registros FROM `atividade`
UNION ALL
SELECT 'conquista' AS tabela, COUNT(*) AS registros FROM `conquista`
UNION ALL
SELECT 'participacao' AS tabela, COUNT(*) AS registros FROM `participacao`
UNION ALL
SELECT 'integrante_conquista' AS tabela, COUNT(*) AS registros FROM `integrante_conquista`
UNION ALL
SELECT 'aviso' AS tabela, COUNT(*) AS registros FROM `aviso`
UNION ALL
SELECT 'evento' AS tabela, COUNT(*) AS registros FROM `evento`
UNION ALL
SELECT 'pergunta_frequente' AS tabela, COUNT(*) AS registros FROM `pergunta_frequente`
UNION ALL
SELECT 'movimentacao_financeira' AS tabela, COUNT(*) AS registros FROM `movimentacao_financeira`;

-- Esperado: zero linhas nas consultas de inconsistencias abaixo.
SELECT u.id_usuario AS usuario_sem_login
FROM usuario u LEFT JOIN login l ON l.id_usuario = u.id_usuario
WHERE l.id_usuario IS NULL;
SELECT u.id_usuario AS usuario_sem_perfil
FROM usuario u LEFT JOIN usuario_perfil up ON up.id_usuario = u.id_usuario
WHERE up.id_usuario IS NULL;
SELECT s.id_secao AS coordenador_sem_perfil_chefe
FROM secao s
WHERE s.id_chefe IS NOT NULL AND NOT EXISTS (
 SELECT 1 FROM usuario_perfil up INNER JOIN perfil p ON p.id_perfil=up.id_perfil
 WHERE up.id_usuario=s.id_chefe AND p.nome='chefe'
);
SELECT ic.id_integrante_conquista AS concessao_sem_responsavel_autorizado
FROM integrante_conquista ic INNER JOIN integrante i ON i.id_integrante=ic.id_integrante
INNER JOIN secao s ON s.id_secao=i.id_secao
WHERE NOT EXISTS (
 SELECT 1 FROM usuario_perfil up INNER JOIN perfil p ON p.id_perfil=up.id_perfil
 WHERE up.id_usuario=ic.concedido_por
 AND (p.nome='administrador' OR (p.nome='chefe' AND s.id_chefe=ic.concedido_por))
);
-- Esta ultima verificacao usa a secao atual; historicos apos transferencia exigem
-- validar a autorizacao no momento da concessao, nao inferi-la retroativamente.
SELECT m.id_movimentacao AS lancamento_sem_administrador
FROM movimentacao_financeira m WHERE NOT EXISTS (
 SELECT 1 FROM usuario_perfil up INNER JOIN perfil p ON p.id_perfil=up.id_perfil
 WHERE up.id_usuario=m.registrado_por AND p.nome='administrador'
);
SELECT av.id_aviso AS aviso_com_grupo_inconsistente
FROM aviso av INNER JOIN secao s ON s.id_secao=av.id_secao WHERE s.id_grupo<>av.id_grupo;
SELECT ev.id_evento AS evento_com_grupo_inconsistente
FROM evento ev INNER JOIN secao s ON s.id_secao=ev.id_secao WHERE s.id_grupo<>ev.id_grupo;

-- Resumo financeiro dos dados ficticios: entradas 950.00; saidas 250.00; saldo 700.00.
SELECT COALESCE(SUM(CASE WHEN tipo='entrada' THEN valor ELSE 0 END),0) AS entradas,
       COALESCE(SUM(CASE WHEN tipo='saida' THEN valor ELSE 0 END),0) AS saidas,
       COALESCE(SUM(CASE WHEN tipo='entrada' THEN valor ELSE -valor END),0) AS saldo
FROM movimentacao_financeira;
