# Base Camp

Plataforma web para apoiar a organização, a comunicação e o acompanhamento das atividades do grupo escoteiro.

> Projeto acadêmico integrado das disciplinas de **Engenharia de Requisitos**, **Desenvolvimento Web** e **Administração de Banco de Dados**.

## Sobre o projeto

O **Base Camp** está sendo desenvolvido pela equipe **Escoteiros do BOB** com o propósito de centralizar informações importantes para o funcionamento de um grupo escoteiro.

A plataforma deverá auxiliar no gerenciamento de seções, atividades, conquistas, eventos, avisos e informações administrativas. Também contará com uma área pública para apresentar a história do grupo, seus contatos e respostas para dúvidas frequentes.

## Objetivo

Desenvolver uma aplicação web responsiva, acessível e segura que facilite a organização interna do grupo escoteiro, melhore a comunicação entre seus participantes e disponibilize informações úteis ao público.

## Status

🚧 **Em desenvolvimento — primeira entrega de Desenvolvimento Web**

Nesta etapa, o objetivo é implementar cinco CRUDs completos utilizando JavaScript e o LocalStorage do navegador. Não será desenvolvido um sistema de login nesta entrega.

## Primeira entrega de Desenvolvimento Web

Como a equipe possui cinco integrantes, serão desenvolvidos cinco CRUDs. Cada CRUD deverá permitir cadastrar, listar, editar e excluir registros.

| CRUD | Operações previstas | Armazenamento sugerido |
| --- | --- | --- |
| Seções | Cadastrar, listar, editar e excluir seções | `basecamp_secoes` |
| Atividades | Cadastrar, listar, editar e excluir atividades | `basecamp_atividades` |
| Conquistas | Cadastrar, listar, editar e excluir conquistas | `basecamp_conquistas` |
| Calendário | Cadastrar, listar, editar e excluir eventos | `basecamp_eventos` |
| Avisos | Cadastrar, listar, editar e excluir avisos | `basecamp_avisos` |

Os dados serão representados por listas de objetos e armazenados utilizando:

- `localStorage.setItem()`;
- `localStorage.getItem()`;
- `JSON.stringify()`;
- `JSON.parse()`.

## Funcionalidades gerais previstas

- Gerenciamento das seções do grupo;
- Gerenciamento de atividades;
- Registro de conquistas dos integrantes;
- Controle de informações financeiras;
- Calendário de eventos e compromissos;
- Publicação e consulta de avisos;
- Consulta ao perfil do usuário;
- Apresentação da história e dos contatos do grupo;
- Área de perguntas frequentes;
- Controle de acesso de acordo com o perfil do usuário.

## Perfis previstos

| Perfil | Acesso esperado |
| --- | --- |
| Público | História do grupo, contatos e perguntas frequentes. |
| Integrante | Perfil pessoal, atividades, conquistas, calendário e avisos. |
| Chefe | Organização das seções, atividades, conquistas, calendário e avisos. |
| Administrador | Gerenciamento geral, informações financeiras e permissões. |

## Tecnologias

### Etapa atual

- HTML5;
- CSS3;
- JavaScript;
- LocalStorage;
- Bootstrap, opcionalmente.

### Etapas futuras

- MySQL para persistência dos dados;
- Integração entre a interface web e o banco de dados;
- Autenticação e controle de acesso por perfil.

Na primeira entrega, os dados permanecerão no LocalStorage. Nas etapas posteriores, os CRUDs serão aproveitados e adaptados para utilizar a persistência definida no projeto de Banco de Dados.

## Organização do repositório

```text
base-camp/
├── README.md
├── .gitignore
├── src/
│   ├── index.html
│   ├── pages/
│   └── assets/
│       ├── css/
│       ├── js/
│       └── img/
├── database/
│   ├── modelagem/
│   └── scripts/
└── docs/
    ├── engenharia-de-requisitos/
    │   └── sprint-01/
    ├── desenvolvimento-web/
    │   └── sprint-01/
    └── banco-de-dados/
        └── sprint-01/
```

- `src/`: código atual da aplicação;
- `database/`: modelos e scripts produzidos para o banco de dados;
- `docs/`: documentos, checklists e evidências organizados por disciplina e sprint.

O código não será duplicado dentro das pastas de cada sprint. As versões entregues serão preservadas por meio do histórico do Git, de tags e de releases.

## Versionamento e fluxo de trabalho

A branch `main` deverá conter a versão integrada e estável do projeto. Cada tela será desenvolvida em uma branch própria, conforme as regras da atividade.

Exemplos:

```text
feature/estrutura-interface
feature/tela-secoes
feature/tela-atividades
feature/tela-conquistas
feature/tela-calendario
feature/tela-avisos
```

Ao final da primeira entrega de Desenvolvimento Web, será criada a tag:

```text
entrega-web-sprint-01
```

Essa tag preservará a versão exata da aplicação com os cinco CRUDs utilizando LocalStorage, mesmo depois que o projeto avançar para novas etapas.

## Como executar

1. Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

2. Acesse a pasta do projeto:

```bash
cd base-camp
```

3. Abra o arquivo `src/index.html` no navegador.

Também é possível executar o projeto utilizando uma extensão de servidor local, como o Live Server do Visual Studio Code.

## Requisitos de qualidade

A aplicação deverá:

- Ser responsiva em computadores, tablets e smartphones;
- Apresentar uma interface clara e consistente;
- Possuir recursos básicos de acessibilidade;
- Armazenar e recuperar os dados corretamente;
- Permitir a utilização completa dos cinco CRUDs;
- Ser testada em outro navegador ou em uma janela anônima antes da entrega.

## Metodologia

O trabalho será organizado com Scrum. Os responsáveis pelos papéis da equipe, as atividades, a Sprint Review e a Sprint Retrospective serão registrados na documentação de cada sprint.

## Equipe

**Escoteiros do BOB**

- Diego Rhian Bochnia;
- Guilherme Moczedlo;
- Luigi Pietrobon;
- Pedro Chaves;
- Vinicius Dias.

