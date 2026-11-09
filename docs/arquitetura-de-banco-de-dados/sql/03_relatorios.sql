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
