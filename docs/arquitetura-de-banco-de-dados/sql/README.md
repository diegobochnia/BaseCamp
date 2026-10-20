# BaseCamp — SQL revisado

Banco relacional do projeto BaseCamp, com 16 tabelas, alinhado ao modelo lógico revisado. Equipe: Escoteiros do BOB.

## Como importar no XAMPP

1. Inicie Apache e MySQL no painel do XAMPP.
2. Abra o phpMyAdmin e vá à aba **Importar**.
3. Selecione **basecamp_v2_completo.sql**, com formato **SQL** e conjunto de caracteres **utf-8**.
4. Execute a importação. O próprio arquivo cria e seleciona o banco **basecamp_v2**.
5. Na barra lateral, abra esse banco e confira as **16 tabelas**.

Importe o arquivo completo **uma vez, em um banco novo**. Ele não apaga nem altera o banco da entrega anterior. Caso já exista um banco chamado `basecamp_v2` com tabelas ou dados, use outro nome nos comandos `CREATE DATABASE` e `USE` de todos os scripts. O pacote não realiza migração automática de dados antigos.

Compatibilidade prevista: MariaDB 10.4 ou superior e MySQL 8.0.16 ou superior. As restrições `CHECK` dependem de uma versão que as aplique. O nome MySQL exibido pelo painel do XAMPP pode corresponder ao servidor MariaDB.

## Arquivos

| Arquivo | Finalidade |
| --- | --- |
| `basecamp_v2_completo.sql` | Estrutura, dados fictícios, três relatórios e consultas de verificação, em um único arquivo. |
| `01_estrutura.sql` | Criação do banco, tabelas, chaves, índices e restrições. |
| `02_dados.sql` | Carga de 95 registros fictícios, em uma transação. |
| `03_relatorios.sql` | Três relatórios com INNER JOIN e suas descrições. |
| `04_validacao.sql` | Consultas de verificação, sem alterações nos dados. |
| `VALIDACAO.txt` | Resultado dos testes realizados nesta revisão. |

Escolha **uma forma de instalação**: importe o arquivo completo ou os arquivos 01 e 02, nessa ordem. Não importe ambas as opções no mesmo banco. Os arquivos 03 e 04 podem ser executados novamente para consultar os dados.

## Estrutura

- Contas: `usuario`, `login`, `perfil`, `usuario_perfil`.
- Organização: `grupo`, `ramo`, `secao`, `integrante`.
- Atividades e conquistas: `atividade`, `participacao`, `conquista`, `integrante_conquista`.
- Comunicação: `aviso`, `evento`, `pergunta_frequente`.
- Financeiro: `movimentacao_financeira`.

As duas tabelas novas em relação à entrega de 14 tabelas são `evento` e `pergunta_frequente`. O SQL revisado também ajusta campos e vínculos das demais tabelas; não basta adicionar apenas essas duas tabelas ao banco antigo.

## Relatórios

1. **Usuários e seus perfis:** nome, e-mail, perfil e data de atribuição. Usuários com dois perfis aparecem duas vezes. Resultado inicial: 11 linhas.
2. **Participantes das atividades:** grupo e seção da atividade, integrante, situação da inscrição e presença. Inscrições canceladas continuam identificadas. Resultado inicial: 8 linhas.
3. **Conquistas obtidas:** integrante, conquista, critérios, data e responsável pela concessão. Resultado inicial: 6 linhas.

Os relatórios são consultas administrativas de demonstração. Na futura aplicação, o servidor deve aplicar os filtros de autorização antes de disponibilizar seus resultados a cada perfil.

## Dados de demonstração

Todos os nomes, contatos e situações são fictícios. Os domínios `.example` identificam contatos de demonstração.

- Contas: `usuario1@basecamp.example` até `usuario10@basecamp.example`.
- Senha de demonstração: `BaseCamp@2026`, armazenada somente como hash bcrypt.
- Usuário 1: administrador; 2 e 3: chefes; 4 a 9: escoteiros; 10: administrador e chefe.
- Uma seção está inativa e sem chefe para demonstrar a possibilidade de vínculo opcional.
- Resumo financeiro: entradas **950,00**, saídas **250,00**, saldo **700,00**.

O cadastro das credenciais no banco não implementa a tela de login, a API ou o controle de sessão. Na integração PHP, os hashes podem ser verificados com `password_verify()`.

## O que o banco valida diretamente

- Chaves primárias e estrangeiras, com preservação de referências nas exclusões.
- E-mail, identificador de login e vínculos definidos como únicos.
- Uma inscrição por integrante e atividade; uma concessão por integrante e conquista.
- Tipos e situações permitidos, valor financeiro positivo e ordem de datas.
- Coerência entre cancelamento e data de cancelamento.
- Coerência entre visibilidade e presença da seção destinatária de avisos/eventos.

`NULL` em telefone, foto, observação, chefe de seção ou destino opcional pode ser válido; não indica falha de importação.

## Regras das operações da aplicação

As chaves estrangeiras confirmam a existência dos registros. Elas não confirmam o perfil de quem faz a operação. Este pacote não instala triggers, procedimentos ou contas de servidor por perfil.

A integração deverá validar sessão e usuário ativo; atribuição de ao menos um perfil; criação conjunta de usuário e login; permissão de administrador no financeiro, contas e FAQ; perfil chefe e coordenação nas operações de seção; prazos de inscrição e presença; correspondência entre grupo e seção; transferências; tratamento de integrantes antes de desativar seção; e bloqueio de operações novas em atividades canceladas.

O banco foi modelado para um único grupo; a aplicação deve manter esse escopo. O histórico de participação permanece ligado à seção da atividade. A autorização de uma concessão deve ser conferida no momento da operação: após uma transferência, não se deve julgar retroativamente o concedente apenas pela seção atual do jovem.

## Validação realizada

Estrutura, carga e relatórios foram executados no motor **MariaDB 10.11.14**, em modo bootstrap, sem conexão de rede. As contagens das 16 tabelas foram conferidas após os testes. Também foram conferidos os códigos de erro esperados em 12 tentativas inválidas, descritas em `VALIDACAO.txt`.

Em 20/10/2026, a equipe confirmou a importação e as consultas de conferência no phpMyAdmin do XAMPP: 16 tabelas, 95 registros, 16 PK, 24 FK, 8 UNIQUE e 20 CHECK cadastradas. Os três relatórios retornaram 11, 8 e 6 linhas; o financeiro apresentou entradas de 950,00, saídas de 250,00 e saldo de 700,00. As sete verificações de inconsistência retornaram zero problemas.

As evidências estão relacionadas no [README da disciplina](../README.md). Os testes de rejeição registrados acima correspondem ao ambiente MariaDB de preparação; não foram repetidos localmente nesta conferência. Não foi executado um servidor MySQL separado no ambiente de preparação.

Na execução em lote pelo phpMyAdmin ocorreu uma mudança de contexto para `information_schema`. A conferência foi concluída por consultas separadas e referências explícitas a `basecamp_v2.nome_da_tabela`. Se ocorrer o mesmo erro, execute por etapas, selecionando `basecamp_v2` e qualificando as tabelas de dados. Nos metadados, filtre explicitamente o schema `basecamp_v2`.
