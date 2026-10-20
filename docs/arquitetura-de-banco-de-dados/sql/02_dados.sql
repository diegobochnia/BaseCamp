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
