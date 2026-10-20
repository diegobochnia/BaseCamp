# BaseCamp

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Aplicação web para apoiar a organização de um grupo escoteiro, desenvolvida pela equipe **Escoteiros do BOB**, no curso de Engenharia de Software da **PUCPR**.

## Objetivo

Centralizar atividades, participação dos integrantes, conquistas, avisos e movimentações financeiras de um grupo escoteiro. Disponibilizar informações institucionais ao público e funcionalidades internas conforme o perfil do usuário.

## Estado atual

| Área | Situação |
| --- | --- |
| Desenvolvimento Web | Primeira entrega com cinco CRUDs independentes em JavaScript e LocalStorage, registrada por commit. O código atual inclui melhorias no cabeçalho e na navegação. |
| Arquitetura de Banco de Dados | Modelos conceitual e lógico revisados; SQL com 16 tabelas e 95 registros fictícios, três relatórios com INNER JOIN e evidências de conferência no XAMPP. |
| Engenharia de Requisitos | 23 requisitos funcionais e 5 não funcionais, documentação das Sprints 1 e 2 e diagrama de casos de uso. O documento consolidado da Sprint 3 está em revisão pela equipe. |
| Integração | Integração da aplicação com o banco, autenticação efetiva e controle de permissões previstos para a evolução do projeto. |

A documentação descreve o produto final previsto. Sua existência não significa que todas as funcionalidades estejam implementadas na aplicação atual.

## Documentação por disciplina

- [Engenharia de Requisitos](docs/engenharia-de-requisitos/README.md): requisitos, usuários, permissões, elicitação, regras de negócio e entregas por sprint.
- [Arquitetura de Banco de Dados](docs/arquitetura-de-banco-de-dados/README.md): modelos, scripts SQL, relatórios e evidências.
- [Desenvolvimento Web](docs/desenvolvimento-web/README.md): primeira entrega, responsabilidades, execução e roteiro de verificação dos CRUDs.

O [DOCX consolidado da Sprint 3](docs/engenharia-de-requisitos/entregas/sprint-03/BaseCamp_Sprint_3.docx) permanece em revisão. Sua versão final em PDF será incluída em outro commit, após a revisão da equipe. A apresentação de Banco de Dados foi entregue no AVA e não integra este repositório.

## Equipe e responsabilidades nos CRUDs

| Integrante | CRUD da primeira entrega |
| --- | --- |
| Diego Rhian Bochnia | Avisos |
| Guilherme Moczedlo Kadubitzki | Integrantes |
| Luigi Ulbrich Pietrobon | Seções |
| Pedro Chaves Steck | Atividades |
| Vinicius Dias Marcondes da Cruz | Conquistas |

Cada CRUD permite cadastrar, listar, editar e excluir registros. A versão da primeira entrega está registrada no commit [0c63d97](https://github.com/diegobochnia/BaseCamp/tree/0c63d978128d7e1c3f8e37a46319e0b08475bd09).

## Tecnologias

- HTML e JavaScript.
- Tailwind CSS carregado por CDN.
- LocalStorage e JSON na aplicação atual.
- SQL, com tabelas InnoDB e codificação utf8mb4, no banco revisado.
- XAMPP, Apache e phpMyAdmin para execução e conferência local.
- Git e GitHub para versionamento.
- draw.io e Astah para os modelos e diagramas.

## Executar a aplicação atual

1. Copie a pasta do projeto para `C:\xampp\htdocs\base-camp`.
2. Abra o XAMPP Control Panel e inicie o **Apache**.
3. Acesse [http://localhost/base-camp/src/](http://localhost/base-camp/src/).
4. Utilize o menu para acessar Integrantes, Seções, Atividades, Conquistas e Avisos.

Para executar os cinco CRUDs, não é necessário iniciar o MySQL nem importar os scripts SQL. A estilização por CDN requer acesso à internet.

Os dados são salvos no LocalStorage da origem da aplicação e do perfil do navegador, por meio de `localStorage.getItem()`, `localStorage.setItem()`, `JSON.parse()` e `JSON.stringify()`. Permanecem após recarregar a página, desde que o armazenamento não seja apagado. Outro navegador ou perfil tem seus próprios registros; em navegação anônima, o armazenamento é temporário.

### Tela de login

A página de login está presente como parte da evolução da interface. O script solicita `/api/login`, mas este repositório ainda não contém a API correspondente. O link de criação de conta aponta para `cadastro.html`, página ainda não incluída. A tela não deve ser usada como evidência de autenticação ou de controle de acesso implementados.

## Executar o banco separadamente

1. Inicie **Apache** e **MySQL** no XAMPP e abra [phpMyAdmin](http://localhost/phpmyadmin).
2. Em uma instalação nova, importe [basecamp_v2_completo.sql](docs/arquitetura-de-banco-de-dados/sql/basecamp_v2_completo.sql), em formato SQL e UTF-8.
3. Confira o banco `basecamp_v2`. Se ele já estiver preenchido, execute somente as consultas de relatórios e validação, sem repetir a criação ou a carga.
4. Consulte as [instruções detalhadas do SQL](docs/arquitetura-de-banco-de-dados/sql/README.md).

O banco revisado é instalado separadamente da versão anterior. Importar o SQL não conecta automaticamente os CRUDs ao banco.

Na conferência local, foram confirmados 16 tabelas, 95 registros, 16 chaves primárias, 24 chaves estrangeiras e 8 restrições UNIQUE. Os relatórios retornaram 11, 8 e 6 linhas; o saldo financeiro foi de 700,00 e as sete verificações de inconsistências retornaram zero problemas. As [evidências estão disponíveis na documentação da disciplina](docs/arquitetura-de-banco-de-dados/README.md#evidências).

## Estrutura principal

```text
base-camp/
├── README.md
├── docs/
│   ├── engenharia-de-requisitos/
│   ├── arquitetura-de-banco-de-dados/
│   │   ├── modelos/
│   │   ├── sql/
│   │   └── evidências/
│   └── desenvolvimento-web/
└── src/
    ├── index.html
    ├── assests/
    │   ├── login.js
    │   └── js/
    │       ├── cabecalho.js
    │       ├── integrantes.js
    │       ├── secoes.js
    │       ├── atividades.js
    │       ├── conquistas.js
    │       └── avisos.js
    └── pages/
        ├── images/
        │   └── logo-basecamp.png
        ├── login.html
        ├── integrantes.html
        ├── secoes.html
        ├── atividades.html
        ├── conquistas.html
        └── avisos.html
```

A grafia `assests` corresponde à pasta existente e aos caminhos utilizados no código. Os modelos e scripts do banco estão centralizados na documentação de Arquitetura de Banco de Dados.
