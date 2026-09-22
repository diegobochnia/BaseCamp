# BaseCamp

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Aplicação web desenvolvida para auxiliar na organização e no gerenciamento das informações de um grupo escoteiro.

O projeto foi criado pela equipe **Escoteiros do BOB** como parte de uma atividade acadêmica integrada.

## Integrantes

- Diego Rhian Bochnia
- Guilherme Moczedlo Kadubitzki
- Luigi Ulbrich Pietrobon
- Pedro Chaves Steck
- Vinicius Dias Marcondes da Cruz

## Objetivo

O BaseCamp tem como objetivo centralizar informações importantes de um grupo escoteiro, facilitando o gerenciamento de integrantes, seções, atividades, conquistas e avisos.

Nesta etapa do projeto, foram desenvolvidos cinco CRUDs utilizando JavaScript e LocalStorage.

## CRUDs desenvolvidos

| CRUD | Funcionalidades |
|---|---|
| Integrantes | Cadastrar, listar, editar e excluir integrantes |
| Seções | Cadastrar, listar, editar e excluir seções |
| Atividades | Cadastrar, listar, editar e excluir atividades |
| Conquistas | Cadastrar, listar, editar e excluir conquistas |
| Avisos | Cadastrar, listar, editar e excluir avisos |

## O que é um CRUD?

CRUD representa as quatro operações básicas utilizadas para gerenciar dados:

- **Create:** cadastrar um novo registro;
- **Read:** listar e consultar os registros;
- **Update:** alterar um registro existente;
- **Delete:** excluir um registro.

Cada integrante da equipe ficou responsável pelo desenvolvimento e pela explicação de um dos CRUDs da aplicação.

## Armazenamento dos dados

Nesta etapa, os dados são armazenados no **LocalStorage** do navegador.

Os registros são organizados em listas de objetos JavaScript e armazenados utilizando:

- `localStorage.getItem()`;
- `localStorage.setItem()`;
- `JSON.parse()`;
- `JSON.stringify()`.

O `JSON.stringify()` transforma as listas em texto para que possam ser armazenadas. O `JSON.parse()` transforma os dados armazenados novamente em listas de objetos JavaScript.

Os dados permanecem salvos mesmo após a página ser atualizada ou fechada. Porém, cada navegador possui seu próprio LocalStorage.

## Tecnologias utilizadas

- HTML5;
- JavaScript;
- Tailwind CSS;
- LocalStorage;
- XAMPP e servidor Apache;
- Git e GitHub.

O Tailwind CSS é carregado por CDN. Por isso, é necessário estar conectado à internet para que toda a estilização seja apresentada corretamente.

## Estrutura do projeto

```text
base-camp/
├── README.md
├── .gitignore
└── src/
    ├── index.html
    ├── pages/
    │   ├── integrantes.html
    │   ├── secoes.html
    │   ├── atividades.html
    │   ├── conquistas.html
    │   └── avisos.html
    └── assests/
        └── js/
            ├── integrantes.js
            ├── secoes.js
            ├── atividades.js
            ├── conquistas.js
            └── avisos.js


```
## Como executar

Para executar a aplicação, utilize o XAMPP seguindo as etapas abaixo:

### 1. Copiar o projeto

Localize a pasta `htdocs` do XAMPP. Normalmente, ela está disponível no seguinte caminho:

```text
C:\xampp\htdocs
```

Copie a pasta completa `base-camp` para dentro da pasta `htdocs`.

A estrutura deverá ficar semelhante a:

```text
C:\xampp\htdocs\base-camp
```

### 2. Iniciar o servidor

Abra o painel de controle do XAMPP e clique em **Start** ao lado do serviço **Apache**.

### 3. Abrir a aplicação

Com o Apache em execução, abra o navegador e acesse:

```text
http://localhost/base-camp/src/
```

Também é possível acessar diretamente o arquivo inicial:

```text
http://localhost/base-camp/src/index.html
```

### 4. Navegar pelo sistema

Utilize o menu de navegação da aplicação para acessar os cinco CRUDs:

- Integrantes;
- Seções;
- Atividades;
- Conquistas;
- Avisos.

> **Observação:** os dados são armazenados no LocalStorage do navegador. Ao abrir a aplicação em outro navegador ou em uma janela anônima, os registros anteriores não estarão disponíveis e será necessário cadastrar novos dados.
