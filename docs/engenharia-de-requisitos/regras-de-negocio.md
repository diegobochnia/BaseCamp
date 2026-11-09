# Regras de negócio do BaseCamp

[Voltar à documentação de Engenharia de Requisitos](README.md)

As regras a seguir definem as condições e restrições que orientam o funcionamento do sistema e complementam os requisitos funcionais.

## Regras

| ID | Regra |
| --- | --- |
| RN01 | O sistema atende um grupo escoteiro nesta versão. |
| RN02 | Uma pessoa pode acumular perfis. Suas permissões correspondem aos papéis autorizados. |
| RN03 | Cada integrante possui uma seção atual. Transferências preservam participações e conquistas anteriores. |
| RN04 | Cada seção possui um ramo e até um chefe responsável. Um chefe pode responder por mais de uma seção. |
| RN05 | O término de uma atividade deve ser igual ou posterior ao início. |
| RN06 | Cada integrante pode ter apenas uma inscrição por atividade. |
| RN07 | Inscrições e cancelamentos pelo escoteiro só ocorrem antes do início de atividades programadas. |
| RN08 | Cancelar uma atividade preserva os registros anteriores e impede novas inscrições e novos registros de presença. |
| RN09 | Cada conquista pode ser concedida uma vez por integrante. Correções atualizam ou removem a concessão autorizada, sem criar duplicação. |
| RN10 | Uma atividade participativa aparece no calendário pelo próprio registro. Eventos informativos, sem inscrição ou presença, são compromissos distintos. |
| RN11 | Avisos e eventos podem ser públicos, internos do grupo ou internos de uma seção. |
| RN12 | O saldo financeiro é calculado a partir de entradas e saídas, sem digitação manual do saldo. |
| RN13 | Cadastros com histórico devem ser desativados quando possível. Exclusões devem respeitar os vínculos existentes. |
| RN14 | A progressão corresponde ao histórico de participação e conquistas. A avaliação automática de toda a progressão oficial escoteira fica fora do escopo. |

## Esclarecimentos

- O integrante não registra a própria presença nem concede conquistas.
- A lista básica de integrantes da seção expõe apenas nome e foto, quando houver.
- Transferências realizadas por chefes devem respeitar as seções autorizadas, inclusive a seção de destino.
- As permissões associadas aos perfis e às seções devem ser verificadas nas operações protegidas, conforme os requisitos de acesso e segurança.

## Documentos relacionados

- [Requisitos](requisitos.md)
- [Usuários e permissões](usuarios-e-permissoes.md)
- [Páginas previstas](paginas-previstas.md)
