# BaseCamp — Engenharia de Requisitos

Documentação de Engenharia de Requisitos do projeto interdisciplinar BaseCamp, desenvolvido no curso de Engenharia de Software da PUCPR.

## Identificação

| Campo | Informação |
| --- | --- |
| Projeto | BaseCamp |
| Equipe | Escoteiros do BOB |
| Instituição | Pontifícia Universidade Católica do Paraná — PUCPR |
| Curso | Engenharia de Software |
| Disciplina | Engenharia de Requisitos |

## Integrantes

- Diego Rhian Bochnia
- Guilherme Moczedlo Kadubitzki
- Luigi Ulbrich Pietrobon
- Pedro Chaves Steck
- Vinicius Dias Marcondes da Cruz

## Objetivo do projeto

Desenvolver uma aplicação web para apoiar a organização de um grupo escoteiro.  
Centralizar atividades, participação dos integrantes, conquistas, avisos e movimentações financeiras.  
Disponibilizar informações institucionais ao público e funcionalidades internas conforme o perfil do usuário.

## Escopo

O BaseCamp contempla um único grupo escoteiro, com uma área pública de apresentação e uma área interna de gerenciamento. O acesso às funcionalidades depende dos perfis e das seções vinculadas ao usuário.

São três tipos principais de acesso: público, usuário e administrador do grupo. O tipo usuário compreende os papéis de escoteiro e chefe. O chefe gerencia as seções sob sua responsabilidade; o administrador possui acesso à administração geral do grupo, incluindo o financeiro.

A primeira entrega de Desenvolvimento Web contempla cinco CRUDs independentes com armazenamento em LocalStorage. A integração com MySQL e a autenticação efetiva fazem parte da evolução do produto. Os requisitos documentam o comportamento previsto para a versão final, sem indicar que todas as funcionalidades já estejam implementadas.

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [Requisitos](requisitos.md) | 23 requisitos funcionais e 5 requisitos não funcionais. |
| [Usuários e permissões](usuarios-e-permissoes.md) | Perfis de acesso, responsabilidades e matriz de permissões. |
| [Páginas previstas](paginas-previstas.md) | Páginas da aplicação, funcionalidades e requisitos relacionados. |
| [Regras de negócio](regras-de-negocio.md) | Restrições e condições que orientam o funcionamento do sistema. |
| [Elicitação](elicitacao.md) | Fontes de informação, técnicas utilizadas no cenário acadêmico simulado e justificativas. |

## Entregas por sprint

| Sprint | Conteúdo | Arquivos |
| --- | --- | --- |
| Sprint 1 | Identificação da equipe, objetivo, 23 requisitos funcionais, 5 requisitos não funcionais, fontes de informação e técnicas de elicitação. | [Documento em PDF](entregas/sprint-01/BaseCamp_Sprint_1.pdf) |
| Sprint 2 | Documentação revisada e diagrama de casos de uso. | [Documento em PDF](entregas/sprint-02/BaseCamp_Sprint_2.pdf) · [Diagrama em PDF](entregas/sprint-02/UCdiagrama-BaseCamp.pdf) · [Arquivo editável do Astah](entregas/sprint-02/BaseCamp.asta) |
| Sprint 3 | Em revisão pela equipe. Documento consolidado das três sprints, incluindo o diagrama e cinco especificações de casos de uso: três funcionais e duas relacionadas a requisitos não funcionais. | [Documento consolidado em Word](entregas/sprint-03/BaseCamp_Sprint_3.docx) |

O documento da Sprint 3 reúne os materiais das três sprints. Os arquivos anteriores preservam as versões correspondentes às entregas de cada etapa. Os documentos Markdown desta pasta complementam a documentação e devem acompanhar as definições do projeto.

### Especificações da Sprint 3

| Identificador | Caso de uso | Requisitos relacionados |
| --- | --- | --- |
| UC01 | Gerenciar inscrições | RF04 |
| UC02 | Registrar presença | RF05 |
| UC03 | Conceder conquistas | RF06 e RF07 |
| UC04 | Acessar funções protegidas | RNF04 — Segurança; RF19 e RF20 |
| UC05 | Consultar atividades em diferentes telas | RNF01 — Responsividade; RF03 |

As especificações apresentam descrição, atores, pré-condições, fluxo principal, fluxos alternativos, fluxos de exceção e pós-condições. Os cenários de segurança e responsividade também definem critérios de verificação; sua documentação não comprova testes executados.

### PDF consolidado

O documento consolidado da Sprint 3 está em revisão pela equipe. O DOCX permanece disponível nesta etapa; o PDF final será incluído em outro commit, após a revisão, com o respectivo link nesta seção.

## Elicitação de requisitos

A elicitação considera um cenário acadêmico simulado, conforme a orientação da disciplina. Os stakeholders são representados pela equipe; as técnicas descritas não correspondem a entrevistas ou questionários realizados com um grupo escoteiro real.

## Organização dos arquivos

```text
engenharia-de-requisitos/
├── README.md
├── requisitos.md
├── usuarios-e-permissoes.md
├── paginas-previstas.md
├── regras-de-negocio.md
├── elicitacao.md
└── entregas/
    ├── sprint-01/
    │   └── BaseCamp_Sprint_1.pdf
    ├── sprint-02/
    │   ├── BaseCamp_Sprint_2.pdf
    │   ├── UCdiagrama-BaseCamp.pdf
    │   └── BaseCamp.asta
    └── sprint-03/
        └── BaseCamp_Sprint_3.docx
```
