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

