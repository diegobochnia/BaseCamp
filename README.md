# BaseCamp

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Aplicação web para apoiar a organização de um grupo escoteiro, desenvolvida pela equipe **Escoteiros do BOB** no curso de Engenharia de Software da **PUCPR**.

Nesta entrega de Desenvolvimento Web, os módulos de Avisos, Atividades, Conquistas, Integrantes e Seções permitem cadastrar, listar, editar e excluir registros. Os dados são persistidos em um banco relacional acessado pelo PHP.

## Objetivo

Centralizar atividades, participação dos integrantes, conquistas, avisos e movimentações financeiras de um grupo escoteiro. Disponibilizar informações institucionais ao público e funcionalidades internas conforme o perfil do usuário.


## Tecnologias

- **Front-end** — HTML5, CSS com Tailwind via CDN e JavaScript com `fetch`.
- **Back-end** — PHP com MySQLi e respostas em JSON.
- **Banco de dados** — MySQL ou MariaDB, com script SQL para criar e popular o banco.
- **Ambiente local** — XAMPP com Apache e phpMyAdmin.
- **Versionamento e modelagem** — Git, GitHub, draw.io e Astah.

## Como executar no XAMPP

1. Copie a pasta do projeto para `C:\xampp\htdocs\base-camp`. A página inicial deve estar em `C:\xampp\htdocs\base-camp\src\index.html`.
2. No painel do XAMPP, inicie o **Apache** e o **MySQL**.
3. Abra o [phpMyAdmin](http://localhost/phpmyadmin/), vá à aba **Importar** e selecione o arquivo [basecamp_v2.sql](docs/arquitetura-de-banco-de-dados/sql/basecamp_v2.sql). Na primeira instalação, o script cria o banco `basecamp_v2` e carrega 16 tabelas com dados de exemplo. Se esse banco já estiver carregado, use-o sem reimportar o script.
4. Confira a configuração de [conexao.php](src/assets/php/conexao.php). A configuração padrão do projeto usa servidor `localhost`, usuário `root`, senha vazia e banco `basecamp_v2`. Se o seu ambiente usa outras credenciais, ajuste-as nesse arquivo.
5. Abra o [BaseCamp no navegador](http://localhost/base-camp/src/) e escolha um módulo no menu. Se a pasta tiver outro nome, ajuste o endereço.

O script indica compatibilidade com MariaDB 10.4 ou superior e MySQL 8.0.16 ou superior. A estilização usa Tailwind CSS via CDN e depende de acesso à internet.

## Módulos e responsáveis

| Módulo | Responsável | Tabelas principais |
| --- | --- | --- |
| Avisos | Diego Rhian Bochnia | `aviso` |
| Atividades | Pedro Chaves Steck | `atividade` |
| Conquistas | Vinicius Dias Marcondes da Cruz | `conquista` |
| Integrantes | Guilherme Moczedlo Kadubitzki | `integrante`, `usuario` |
| Seções | Luigi Ulbrich Pietrobon | `secao` |

A autenticação e o controle de acesso estão fora do escopo desta entrega de CRUDs. A tela de login é um protótipo.

## Como os dados circulam

O JavaScript envia as requisições com `fetch` aos endpoints PHP. O PHP acessa o banco com MySQLi e usa instruções preparadas nas operações que recebem valores do usuário. Os endpoints retornam JSON com os campos `status`, `mensagem` e `data`, e o JavaScript atualiza a interface com a resposta.

## Estrutura principal do projeto

```text
base-camp/
├── README.md
├── docs/
│   ├── arquitetura-de-banco-de-dados/
│   │   ├── modelos/
│   │   └── sql/
│   │       └── basecamp_v2.sql
│   ├── desenvolvimento-web/
│   └── engenharia-de-requisitos/
└── src/
    ├── index.html
    ├── assets/
    │   ├── css/
    │   ├── img/
    │   ├── js/
    │   │   ├── atividades.js
    │   │   ├── avisos.js
    │   │   ├── cabecalho.js
    │   │   ├── conquistas.js
    │   │   ├── integrantes.js
    │   │   └── secoes.js
    │   └── php/
    │       ├── conexao.php
    │       ├── atividades/
    │       ├── avisos/
    │       ├── conquistas/
    │       ├── integrantes/
    │       └── secoes/
    └── pages/
        ├── atividades.html
        ├── avisos.html
        ├── conquistas.html
        ├── integrantes.html
        ├── login.html
        └── secoes.html
```

## Roteiro de teste

1. Abra cada módulo e confira a listagem.
2. Cadastre um registro de teste e confirme que ele aparece na página.
3. Edite o registro, atualize a página e confira se o valor alterado foi mantido. Abra o mesmo módulo em uma janela anônima para verificar se ele também aparece lá.
4. Exclua o registro de teste e confirme que ele desaparece da listagem. Use um registro recém-criado sem vínculos. O banco pode impedir a exclusão de registros referenciados por outras tabelas.

Em **Avisos**, confira também se a seção selecionada aparece ao reabrir a edição de um aviso com visibilidade **Uma seção**. Em um banco de teste, exclua o último aviso e verifique se a lista fica vazia sem recarregar a página.

## Documentação por disciplina

- [Arquitetura de Banco de Dados](docs/arquitetura-de-banco-de-dados/README.md)
- [Desenvolvimento Web — registro da primeira entrega](docs/desenvolvimento-web/README.md)
- [Engenharia de Requisitos](docs/engenharia-de-requisitos/README.md)