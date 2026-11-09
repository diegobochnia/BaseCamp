# BaseCamp — Arquitetura de Banco de Dados

Documentação da modelagem e implementação do banco de dados relacional do BaseCamp, projeto interdisciplinar do curso de Engenharia de Software da PUCPR.

## Identificação

| Campo | Informação |
| --- | --- |
| Projeto | BaseCamp |
| Equipe | Escoteiros do BOB |
| Instituição | Pontifícia Universidade Católica do Paraná — PUCPR |
| Curso | Engenharia de Software |
| Disciplina | Arquitetura de Banco de Dados |

### Integrantes

- Diego Rhian Bochnia
- Guilherme Moczedlo Kadubitzki
- Luigi Ulbrich Pietrobon
- Pedro Chaves Steck
- Vinicius Dias Marcondes da Cruz

## Objetivo

Modelar e implementar o armazenamento dos dados de um grupo escoteiro, contemplando usuários e perfis, seções, integrantes, atividades, inscrições, conquistas, comunicação e movimentações financeiras.

O banco apoia as funcionalidades descritas na [documentação de Engenharia de Requisitos](../engenharia-de-requisitos/README.md). As restrições de acesso também dependem da validação realizada pela aplicação.

## Modelos

| Modelo | Editável | PDF |
| --- | --- | --- |
| Conceitual | [Conceitual-BaseCamp.drawio](modelos/Conceitual-BaseCamp.drawio) | [Conceitual-BaseCamp.drawio.pdf](modelos/Conceitual-BaseCamp.drawio.pdf) |
| Lógico | [Logico-BaseCamp.drawio](modelos/Logico-BaseCamp.drawio) | [Lógico-BaseCamp.drawio.pdf](modelos/Lógico-BaseCamp.drawio.pdf) |

O modelo conceitual possui 13 entidades. O modelo lógico possui 16 tabelas, pois os relacionamentos de atribuição de perfis, inscrição em atividades e concessão de conquistas também geram tabelas associativas.

## Tabelas

| Área | Tabelas |
| --- | --- |
| Contas e acesso | `usuario`, `login`, `perfil`, `usuario_perfil` |
| Organização | `grupo`, `ramo`, `secao`, `integrante` |
| Atividades e conquistas | `atividade`, `participacao`, `conquista`, `integrante_conquista` |
| Comunicação | `aviso`, `evento`, `pergunta_frequente` |
| Financeiro | `movimentacao_financeira` |

As tabelas associativas são:

- `usuario_perfil`: permite atribuir mais de um perfil ao mesmo usuário.
- `participacao`: vincula integrante e atividade e registra inscrição, cancelamento e presença.
- `integrante_conquista`: vincula integrante e conquista e registra a data e o usuário responsável pela concessão.

## Scripts SQL

| Arquivo | Finalidade |
| --- | --- |
| [01_estrutura.sql](sql/01_estrutura.sql) | Criação do banco, das 16 tabelas, das chaves, dos índices e das restrições. |
| [02_dados.sql](sql/02_dados.sql) | Inserção de 95 registros fictícios para demonstração. |
| [03_relatorios.sql](sql/03_relatorios.sql) | Três relatórios com `INNER JOIN`, acompanhados de suas descrições. |
| [04_validacao.sql](sql/04_validacao.sql) | Consultas de verificação das tabelas, dos vínculos e dos dados. |

Também estão disponíveis o [script completo](sql/basecamp_v2_completo.sql), as [instruções detalhadas de execução](sql/README.md) e o [registro dos testes](sql/VALIDACAO.txt).

## Execução no XAMPP

### Requisitos de execução

- XAMPP com Apache e o serviço identificado como MySQL iniciados.
- Acesso ao phpMyAdmin.
- MariaDB 10.4 ou superior, ou MySQL 8.0.16 ou superior, para aplicação das restrições utilizadas.
- Arquivos SQL em UTF-8.

### Importação dos scripts separados

1. Abra o phpMyAdmin e selecione a aba **Importar**.
2. Importe `01_estrutura.sql`, usando o formato **SQL** e a codificação **utf-8**.
3. O script cria e seleciona o banco `basecamp_v2`.
4. Importe `02_dados.sql` para carregar os dados fictícios.
5. Execute `03_relatorios.sql` para consultar os três relatórios.
6. Execute `04_validacao.sql` para conferir a estrutura e os dados.

Como alternativa, importe apenas `sql/basecamp_v2_completo.sql`. Não execute o arquivo completo e os scripts de criação/carga novamente no mesmo banco.

Os scripts devem ser importados uma vez em um banco novo. Não apagam nem migram o banco da entrega anterior. Se `basecamp_v2` já contiver tabelas ou dados, utilize um novo nome e altere os comandos `CREATE DATABASE` e `USE` de todos os scripts que serão executados.

## Relatórios

| Relatório | Informações apresentadas | Resultado inicial |
| --- | --- | --- |
| Usuários e seus perfis de acesso | Nome, e-mail, perfil e data de atribuição. Um usuário com dois perfis aparece em duas linhas. | 11 linhas |
| Participantes das atividades | Grupo, seção da atividade, atividade, integrante, situação da inscrição e presença. Inclui inscrições canceladas, identificadas no resultado. | 8 linhas |
| Conquistas obtidas pelos integrantes | Integrante, conquista, critérios, data, responsável e observação da concessão. | 6 linhas |

Como utilizam `INNER JOIN`, os relatórios apresentam somente registros que possuem os vínculos necessários. As quantidades correspondem à carga fictícia inicial e mudam conforme os dados são alterados.

A seção apresentada no relatório de participantes é a seção da atividade. Isso preserva a interpretação do histórico quando o integrante é transferido.

## Integridade dos dados

O SQL define chaves primárias, 24 chaves estrangeiras, restrições de unicidade e verificações de domínio. Entre as regras aplicadas diretamente estão:

- Impedir e-mails e identificadores de login repetidos.
- Impedir duas inscrições para o mesmo integrante na mesma atividade.
- Impedir duas concessões da mesma conquista ao mesmo integrante.
- Impedir referências a registros inexistentes e exclusões que quebrem vínculos históricos.
- Exigir valores financeiros positivos e tipos de movimentação válidos.
- Verificar a ordem das datas de atividades e eventos.
- Verificar a coerência entre cancelamento e data de cancelamento.
- Verificar a coerência entre visibilidade e seção destinatária de avisos e eventos.

O saldo é calculado a partir das entradas e saídas; não é armazenado em uma tabela de caixa. Calendário, painel e histórico também consultam dados existentes.

## Perfis e regras da aplicação

O sistema atende um grupo escoteiro nesta versão. O público consulta informações públicas sem conta. Os perfis internos são escoteiro, chefe e administrador, e uma pessoa pode acumular perfis.

O chefe gerencia as seções sob sua responsabilidade. O administrador possui acesso geral ao grupo, incluindo contas, cadastro de integrantes, seções, FAQ e financeiro.

As chaves estrangeiras confirmam a existência dos registros, mas não verificam sozinhas as permissões do usuário. A integração deve validar sessão, usuário ativo, perfis, seções autorizadas, prazos de inscrição, registro de presença e operações em atividades canceladas.

O pacote não instala triggers, procedimentos ou contas de servidor para representar os perfis da aplicação. O cadastro das credenciais também não implementa a tela de login ou a API de autenticação.

## Dados fictícios

A carga contém 95 registros, com nomes e contatos de demonstração. As quantidades por tabela refletem o domínio: há um grupo, três perfis e quatro ramos.

- Contas de demonstração: `usuario1@basecamp.example` até `usuario10@basecamp.example`.
- Senha de demonstração: `BaseCamp@2026`, armazenada como hash bcrypt.
- Usuário 1: administrador; usuários 2 e 3: chefes; usuários 4 a 9: escoteiros; usuário 10: administrador e chefe.
- Totais financeiros iniciais: entradas de **950,00**, saídas de **250,00** e saldo de **700,00**.

Campos opcionais podem apresentar `NULL`, como foto, telefone, observação e chefe de uma seção sem coordenador. Isso não representa erro de importação.

## Validação

A estrutura, a carga e os relatórios foram executados no motor MariaDB 10.11.14, em modo bootstrap. Foram conferidas as contagens das 16 tabelas, os resultados dos relatórios e o saldo financeiro.

Também foram executados 12 testes de rejeição com os códigos de erro esperados, cobrindo duplicações, referência inexistente, exclusão com histórico, valor negativo, datas inválidas, visibilidade incoerente, cancelamento sem data e tipo financeiro inválido.

A importação e as consultas de conferência foram confirmadas pela equipe no phpMyAdmin do XAMPP em 20/10/2026. Foram verificados os seguintes resultados:

| Verificação local | Resultado |
| --- | --- |
| Tabelas | 16 |
| Registros na carga | 95 |
| Chaves primárias | 16 |
| Chaves estrangeiras | 24 |
| Restrições UNIQUE | 8 |
| Restrições CHECK cadastradas | 20 |
| Relatório de usuários e perfis | 11 linhas |
| Relatório de participantes | 8 linhas |
| Relatório de conquistas | 6 linhas |
| Entradas financeiras | 950,00 |
| Saídas financeiras | 250,00 |
| Saldo financeiro | 700,00 |
| Verificações de inconsistência | 7 verificações com zero problemas |

Os 12 testes de rejeição descritos anteriormente foram executados no ambiente MariaDB de preparação; não foram repetidos no XAMPP nesta conferência. As consultas locais verificam a estrutura e os dados existentes e não comprovam, por si só, o bloqueio de todas as operações inválidas ou a implementação das permissões da aplicação.

### Evidências

| Arquivo | Conteúdo |
| --- | --- |
| [1.png](evidências/1.png) | Relatório de usuários e perfis, com 11 linhas. |
| [2.png](evidências/2.png) | Relatório de participantes, com 8 linhas. |
| [3.png](evidências/3.png) | Relatório de conquistas, com 6 linhas. |
| [tabelas.png](evidências/tabelas.png) | Estrutura com 16 tabelas e 95 registros. |
| [restricoes.png](evidências/restricoes.png) | Contagem de tabelas, PK, FK, UNIQUE e CHECK. |
| [contagem-registros.png](evidências/contagem-registros.png) | Quantidade exata de registros por tabela. |
| [resumo-financeiro.png](evidências/resumo-financeiro.png) | Entradas, saídas e saldo. |
| [validacao-inconsistencias.png](evidências/validacao-inconsistencias.png) | Sete verificações, todas com zero problemas. |

As verificações procuram usuários sem login ou perfil, coordenadores sem perfil de chefe, concessões sem responsável autorizado, lançamentos sem administrador e avisos/eventos com grupo inconsistente. A verificação das concessões usa a seção atual do integrante; após transferências, a autorização deve ser avaliada no momento da concessão.

### Execução das consultas de validação

Na conferência pelo phpMyAdmin, a execução em lote encontrou uma consulta de contagem no contexto de `information_schema`. Para concluir a verificação, as consultas foram executadas por etapas, com referências explícitas ao banco `basecamp_v2`. Se esse erro ocorrer, selecione `basecamp_v2`, execute `USE basecamp_v2;` e utilize `basecamp_v2.nome_da_tabela` nas consultas dos dados. Nas consultas de metadados, use os filtros `table_schema = 'basecamp_v2'` ou `constraint_schema = 'basecamp_v2'`.

### Apresentação

A apresentação de Banco de Dados foi entregue no AVA e não integra este repositório.

## Evolução da modelagem

A entrega anterior utilizou 14 tabelas. A revisão acrescentou `evento` e `pergunta_frequente`, além de atualizar campos e relacionamentos das demais tabelas para acompanhar os requisitos atuais.

O banco antigo corresponde à entrega anterior. A versão revisada é instalada separadamente em `basecamp_v2`; não há migração automática entre as duas versões.

## Organização da pasta

```text
arquitetura-de-banco-de-dados/
├── README.md
├── modelos/
│   ├── Conceitual-BaseCamp.drawio
│   ├── Conceitual-BaseCamp.drawio.pdf
│   ├── Logico-BaseCamp.drawio
│   └── Lógico-BaseCamp.drawio.pdf
├── sql/
│   ├── 01_estrutura.sql
│   ├── 02_dados.sql
│   ├── 03_relatorios.sql
│   ├── 04_validacao.sql
│   ├── basecamp_v2_completo.sql
│   ├── README.md
│   └── VALIDACAO.txt
└── evidências/
    ├── 1.png
    ├── 2.png
    ├── 3.png
    ├── tabelas.png
    ├── restricoes.png
    ├── contagem-registros.png
    ├── resumo-financeiro.png
    └── validacao-inconsistencias.png
```
