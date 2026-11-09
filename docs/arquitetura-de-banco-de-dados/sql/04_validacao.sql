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
