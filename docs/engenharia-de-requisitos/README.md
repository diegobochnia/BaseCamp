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

## Documento da Sprint 1

A versão revisada da documentação da Sprint 1 está disponível em [Sprint 1 — PDF](entregas/sprint-01/sprint-1.pdf).

Os arquivos Markdown desta pasta constituem a documentação de trabalho e devem ser atualizados conforme as definições do projeto. O PDF reúne o conteúdo consolidado da revisão correspondente.

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
    └──sprint-01/
        └── sprint-1.pdf
```
