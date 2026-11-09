# Usuários e permissões do BaseCamp

[Voltar à documentação de Engenharia de Requisitos](README.md)

## Perfis de acesso

O BaseCamp atende um único grupo escoteiro e possui três tipos principais de acesso: público, usuário e administrador. O tipo usuário compreende os papéis de escoteiro e chefe. O ramo escoteiro não constitui um perfil de acesso.

| Tipo principal | Papel | Responsabilidade |
| --- | --- | --- |
| Público | Visitante | Consultar apresentação, história, contatos, perguntas frequentes, avisos e eventos públicos. |
| Usuário | Escoteiro / integrante | Consultar dados próprios, seção, atividades e conquistas e gerenciar as próprias inscrições autorizadas. |
| Usuário | Chefe | Gerenciar seções sob sua responsabilidade, integrantes vinculados, atividades, presenças, conquistas e comunicação interna dessas seções. |
| Administrador | Administrador do grupo | Administrar cadastros, perfis, financeiro, comunicação e eventos de todo o grupo, com acesso às demais operações. |

O administrador pertence ao grupo escoteiro. Nesta versão, não há um administrador de plataforma responsável por múltiplos grupos independentes.

## Matriz de permissões

“Próprias seções” significa as seções pelas quais o chefe é responsável. A indicação de acesso para todos os perfis não elimina as restrições de visibilidade das informações internas.

| Funcionalidade | Público | Escoteiro | Chefe | Administrador |
| --- | --- | --- | --- | --- |
| Informações institucionais e FAQ | Sim | Sim | Sim | Sim |
| Avisos e eventos públicos | Sim | Sim | Sim | Sim |
| Avisos internos do grupo | Não | Sim | Sim | Sim |
| Avisos e atividades internos de seção | Não | Própria seção | Próprias seções | Todas |
| Dados pessoais e configurações | Não | Próprios | Próprios | Próprios |
| Lista básica de integrantes | Não | Própria seção | Próprias seções | Todas |
| Cadastrar integrantes / criar acessos | Não | Não | Não | Sim |
| Editar, transferir e desativar integrantes | Não | Não | Próprias seções | Todos |
| Criar seções e atribuir chefes | Não | Não | Não | Sim |
| Programar e cancelar atividades | Não | Não | Próprias seções | Todas |
| Inscrever-se / cancelar inscrição | Não | Própria participação | Não se aplica | Não se aplica |
| Gerenciar inscrições e presenças | Não | Não | Próprias seções | Todas |
| Consultar conquistas atribuídas | Não | Próprias | Próprias seções | Todas |
| Manter catálogo de conquistas | Não | Não | Sim | Sim |
| Conceder / corrigir concessões | Não | Não | Próprias seções | Todas |
| Gerenciar avisos e eventos | Não | Não | Internos das próprias seções | Todos |
| Registrar e consultar financeiro | Não | Não | Não | Sim |
| Gerenciar contas e perfis | Não | Não | Não | Sim |
| Editar informações institucionais e FAQ | Não | Não | Não | Sim |

## Condições de aplicação

- Uma pessoa pode acumular perfis. Suas permissões correspondem aos papéis autorizados.
- As permissões do chefe são limitadas às seções sob sua responsabilidade, inclusive à seção de destino em transferências de integrantes.
- O escoteiro consulta o próprio histórico e não registra a própria presença nem concede conquistas.
- A lista básica de integrantes disponibilizada ao escoteiro apresenta apenas nome e foto, quando houver.
- O usuário pode atualizar foto, telefone e senha. O escoteiro não pode alterar a própria seção, o ramo ou as permissões.
- O responsável por jovem participa como fonte de informação no cenário de elicitação. Não possui uma conta própria prevista nesta versão.
- Na versão integrada, o servidor deve verificar sessão e autorização em cada operação protegida, inclusive em acessos diretos por URL. Ocultar botões não substitui a validação de permissões.

## Documentos relacionados

- [Requisitos](requisitos.md)
- [Páginas previstas](paginas-previstas.md)
- [Regras de negócio](regras-de-negocio.md)
