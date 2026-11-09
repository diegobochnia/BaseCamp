# Requisitos do BaseCamp

[Voltar à documentação de Engenharia de Requisitos](README.md)

Este documento descreve o comportamento previsto para a versão final do BaseCamp. A presença de um requisito nesta documentação não indica que ele já esteja implementado.

## Requisitos funcionais

RF01 a RF14 compõem as funcionalidades principais além de login e cadastros básicos. RF15 a RF23 complementam o funcionamento do sistema.

| ID | Requisito | Descrição | Tipo | Categoria | Stakeholder |
| --- | --- | --- | --- | --- | --- |
| RF01 | Organizar integrantes por seção | Permitir ao chefe responsável e ao administrador vincular ou transferir integrantes entre seções autorizadas, mantendo uma seção atual por integrante. | Funcional | Produto | Chefe / Administrador |
| RF02 | Programar atividades | Permitir ao chefe responsável e ao administrador programar e editar atividades com seção, título, descrição, início, término e local, além de alterar sua situação entre programada, concluída e cancelada. | Funcional | Produto | Chefe / Administrador |
| RF03 | Consultar atividades | Apresentar atividades em cards, com filtros por período e situação, respeitando as seções acessíveis ao usuário. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF04 | Gerenciar inscrições | Permitir ao escoteiro inscrever-se ou cancelar sua inscrição em atividades programadas da própria seção, antes do início. Chefes e administrador podem gerenciar inscrições dos integrantes sob sua responsabilidade. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF05 | Registrar presença | Permitir ao chefe responsável e ao administrador registrar presença ou ausência dos inscritos após o início da atividade, com observação opcional. Até o registro, a presença permanece pendente. | Funcional | Produto | Chefe / Administrador |
| RF06 | Conceder conquistas | Permitir ao chefe responsável e ao administrador atribuir conquistas do catálogo aos integrantes, registrando data, responsável e observação opcional. | Funcional | Produto | Chefe / Administrador |
| RF07 | Consultar histórico individual | Permitir ao escoteiro consultar suas participações, presenças e conquistas, incluindo critérios, datas e responsável pela concessão. Chefes consultam integrantes das seções sob sua responsabilidade, e o administrador consulta todos. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF08 | Publicar e consultar avisos | Permitir publicar, editar, excluir e consultar avisos conforme visibilidade e permissões. Cada aviso possui título, mensagem, autor e data de publicação. Chefes gerenciam avisos internos das próprias seções, e o administrador gerencia todos. | Funcional | Produto | Público / Escoteiro / Chefe / Administrador |
| RF09 | Consultar calendário | Apresentar atividades e eventos por data, respeitando a visibilidade e as seções acessíveis. Alterações nas atividades devem aparecer no calendário sem novo cadastro do mesmo compromisso. | Funcional | Produto | Público / Escoteiro / Chefe / Administrador |
| RF10 | Gerenciar eventos do calendário | Permitir ao chefe criar, editar e cancelar eventos internos das suas seções e ao administrador gerenciar eventos de seção ou de todo o grupo, inclusive públicos. | Funcional | Produto | Chefe / Administrador |
| RF11 | Registrar movimentações financeiras | Permitir exclusivamente ao administrador registrar entradas e saídas com valor positivo, data, descrição e identificação do responsável. | Funcional | Produto | Administrador |
| RF12 | Apurar resultados financeiros | Permitir ao administrador consultar movimentações por período e tipo, com totais de entradas, saídas e saldo do período. | Funcional | Produto | Administrador |
| RF13 | Consultar integrantes da seção | Permitir ao escoteiro consultar a lista básica da própria seção e ao chefe e administrador consultar os dados autorizados dos integrantes sob sua responsabilidade. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF14 | Apresentar resumo por perfil | Exibir no painel as próximas atividades, os avisos acessíveis e os atalhos correspondentes às permissões do usuário. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF15 | Manter integrantes | Permitir ao administrador cadastrar integrantes e criar suas contas. Permitir ao chefe responsável e ao administrador editar os dados administrativos autorizados e desativar integrantes, preservando seu histórico. | Funcional | Produto | Chefe / Administrador |
| RF16 | Manter seções | Permitir ao administrador criar e editar seções, definir ramo e chefe responsável e desativá-las mediante tratamento dos integrantes ativos vinculados. | Funcional | Produto | Administrador |
| RF17 | Manter catálogo de conquistas | Permitir ao chefe e ao administrador manter nome, descrição e critérios das conquistas. A exclusão deve respeitar concessões existentes. | Funcional | Produto | Chefe / Administrador |
| RF18 | Gerenciar contas e perfis | Permitir ao administrador criar contas de chefes e administradores, atribuir perfis e ativar ou desativar acessos. | Funcional | Produto | Administrador |
| RF19 | Autenticar e encerrar sessão | Permitir autenticação de contas ativas com credenciais válidas e encerramento da sessão pelo usuário. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF20 | Aplicar permissões | Restringir consultas e operações conforme os perfis do usuário e as seções sob sua responsabilidade, inclusive quando o acesso ocorrer diretamente pela URL. | Funcional | Produto | Público / Escoteiro / Chefe / Administrador |
| RF21 | Consultar e atualizar perfil pessoal | Permitir ao usuário consultar seus dados e alterar foto, telefone e senha. Seção, ramo e permissões não podem ser alterados pelo próprio escoteiro. | Funcional | Produto | Escoteiro / Chefe / Administrador |
| RF22 | Disponibilizar informações institucionais | Permitir consulta pública da apresentação, história e contatos do grupo e sua atualização pelo administrador. | Funcional | Produto | Público / Administrador |
| RF23 | Disponibilizar perguntas frequentes | Permitir consulta pública de perguntas e respostas previamente elaboradas e sua manutenção pelo administrador. | Funcional | Produto | Público / Administrador |

## Requisitos não funcionais

Os critérios abaixo são metas para a versão final. Seu atendimento depende de implementação e verificação; não constitui resultado de testes já realizados.

| ID | Requisito | Descrição / critério | Tipo | Categoria | Stakeholder |
| --- | --- | --- | --- | --- | --- |
| RNF01 | Responsividade | As páginas devem permitir operação em larguras de 360, 768 e 1366 pixels, sem sobreposição ou perda de acesso aos controles. Tabelas podem possuir rolagem no próprio contêiner. | Não funcional | Produto | Todos |
| RNF02 | Acessibilidade | Os fluxos principais devem funcionar por teclado, com foco visível, rótulos nos campos e textos alternativos em imagens informativas. Mensagens não devem depender apenas de cor. | Não funcional | Produto | Todos |
| RNF03 | Desempenho | No ambiente local documentado, com um usuário ativo e até mil registros por tabela operacional, consultas de atividades, histórico e financeiro devem apresentar resultados em até dois segundos em pelo menos 19 de 20 execuções por consulta. | Não funcional | Produto | Escoteiro / Chefe / Administrador |
| RNF04 | Segurança | Na versão integrada, o servidor deve validar sessão e autorização em cada operação protegida, utilizar hash apropriado para senhas e impedir consultas e alterações sem permissão. | Não funcional | Produto | Escoteiro / Chefe / Administrador |
| RNF05 | Usabilidade | Todas as páginas devem manter navegação consistente. Formulários devem identificar campos obrigatórios, explicar erros e informar o resultado das operações. Exclusões devem solicitar confirmação. | Não funcional | Produto | Todos |

### Orientações de verificação

- **RNF03 — Desempenho:** registrar máquina, navegador, versão do servidor, volume de dados e tempos das 20 execuções de cada consulta.
- **RNF04 — Segurança:** verificar também requisições diretas sem sessão e com perfis sem autorização.

## Documentos relacionados

- [Usuários e permissões](usuarios-e-permissoes.md)
- [Páginas previstas](paginas-previstas.md)
- [Regras de negócio](regras-de-negocio.md)
- [Fontes de informação e técnicas de elicitação](elicitacao.md)
