# Páginas previstas do BaseCamp

[Voltar à documentação de Engenharia de Requisitos](README.md)

## Organização das páginas

A aplicação prevê 15 páginas além da página de login. Formulários e modais não contam como páginas adicionais. Uma página compartilhada apresenta informações e ações diferentes conforme o perfil, as seções acessíveis e as permissões do usuário.

Na tabela, “Todos” inclui o público e os usuários autenticados, respeitando a visibilidade de cada registro. “Autenticados” compreende escoteiros, chefes e administradores, com as restrições descritas em [Usuários e permissões](usuarios-e-permissoes.md).

## Relação de páginas

| Nº | Página | Acesso | Conteúdo e ações | Requisitos |
| --- | --- | --- | --- | --- |
| 01 | Início | Todos | Apresentação breve, destaques, avisos públicos e próximos eventos públicos. | RF08, RF09, RF22 |
| 02 | História e contato | Todos | História, apresentação detalhada, endereço e links de contato. | RF22 |
| 03 | Perguntas frequentes | Todos | Perguntas e respostas para consulta pública; manutenção pelo administrador. | RF23 |
| 04 | Painel do usuário | Autenticados | Resumo por papel, próximas atividades, avisos e atalhos autorizados. | RF14 |
| 05 | Meu perfil | Autenticados | Dados pessoais e, para escoteiros, seção e resumo de participação. | RF07, RF21 |
| 06 | Configurações | Autenticados | Edição de telefone, foto e senha, conforme as permissões. | RF21 |
| 07 | Seções | Autenticados | Consulta das seções acessíveis; manutenção pelo administrador. | RF16, RF20 |
| 08 | Detalhes da seção | Autenticados | Lista de integrantes, chefe responsável e atividades, com ações autorizadas. | RF01, RF02, RF13, RF16 |
| 09 | Integrantes | Chefe / Administrador | Busca, consulta, edição, transferência e desativação. Cadastro exclusivo do administrador. | RF01, RF13, RF15 |
| 10 | Atividades | Autenticados | Cards, filtros e manutenção de atividades por usuários autorizados. | RF02, RF03 |
| 11 | Detalhes da atividade | Autenticados | Informações, inscrição ou cancelamento, participantes e presenças conforme permissão. | RF02, RF04, RF05 |
| 12 | Conquistas | Autenticados | Conquistas pessoais para escoteiros; catálogo, concessões e histórico para chefes e administrador. | RF06, RF07, RF17 |
| 13 | Avisos | Todos | Consulta conforme visibilidade; publicação e manutenção por usuários autorizados. | RF08 |
| 14 | Calendário | Todos | Atividades e eventos conforme visibilidade; manutenção de eventos por usuários autorizados. | RF09, RF10 |
| 15 | Financeiro | Administrador | Movimentações, filtros, totais de entradas e saídas e saldo. | RF11, RF12 |
| Extra | Login | Não autenticados | Autenticação, validação de credenciais e mensagens de erro. | RF19 |

## Condições de funcionamento

- Atividades será a página de cards dinâmicos, com filtros e dados consultados no MySQL na versão integrada.
- A página de detalhes da atividade reúne informações, inscrições, participantes e presenças, apresentando somente as ações autorizadas para cada perfil.
- O calendário apresenta atividades e eventos conforme a visibilidade. Uma atividade aparece a partir do próprio registro, sem exigir o cadastro duplicado de um evento.
- Avisos e eventos podem ser públicos, internos do grupo ou internos de uma seção.
- A página de conquistas apresenta conquistas pessoais ao escoteiro e as funções autorizadas de catálogo, concessões e histórico aos chefes e ao administrador.
- O financeiro é exclusivo do administrador do grupo.
- A existência da página de login, isoladamente, não comprova autenticação implementada. A versão integrada deve validar a sessão e as permissões no servidor.

## Documentos relacionados

- [Requisitos](requisitos.md)
- [Usuários e permissões](usuarios-e-permissoes.md)
- [Regras de negócio](regras-de-negocio.md)
