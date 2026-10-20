# BaseCamp — Desenvolvimento Web

Documentação da primeira entrega de Desenvolvimento Web do projeto BaseCamp, desenvolvido pela equipe **Escoteiros do BOB**, no curso de Engenharia de Software da PUCPR.

## Objetivo da atividade

Desenvolver uma aplicação web com cinco CRUDs completos, um por integrante da equipe, utilizando listas de objetos JavaScript e LocalStorage para armazenar os dados.

Cada CRUD contempla cadastro, consulta/listagem, edição e exclusão. Nesta entrega, os módulos são independentes e não possuem integração com banco de dados ou autenticação.

## Entrega registrada

[Consultar o código da primeira entrega no GitHub](https://github.com/diegobochnia/BaseCamp/tree/0c63d978128d7e1c3f8e37a46319e0b08475bd09)

- **Commit de referência:** `0c63d978128d7e1c3f8e37a46319e0b08475bd09` (`0c63d97`).
- **Mensagem:** Atualização do README BaseCamp.
- **Escopo:** cinco CRUDs independentes com LocalStorage.

O commit foi indicado pela equipe como referência anterior à entrega. O ZIP analisado contém comentários explicativos adicionais em `conquistas.js`, sem diferenças no código executável desse arquivo; as diferenças de quebra de linha foram desconsideradas na comparação.

As melhorias posteriores do cabeçalho e de sua responsividade pertencem à evolução do projeto. O link usa um commit específico e não acompanha as alterações futuras da branch principal. Não é necessário manter uma cópia ZIP nesta pasta.

## Integrantes e responsabilidades

| Integrante | CRUD |
| --- | --- |
| Diego Rhian Bochnia | Avisos |
| Vinicius Dias Marcondes da Cruz | Conquistas |
| Luigi Ulbrich Pietrobon | Seções |
| Guilherme Moczedlo Kadubitzki | Integrantes |
| Pedro Chaves Steck | Atividades |

Cada integrante é responsável por explicar as operações e o armazenamento do seu CRUD.

## Funcionalidades

| CRUD | Página na entrega | Operações | Chave no LocalStorage |
| --- | --- | --- | --- |
| Integrantes | `src/pages/integrantes.html` | Cadastrar, listar, editar e excluir integrantes. | `integrantes` |
| Seções | `src/pages/secoes.html` | Cadastrar, listar, editar e excluir seções. | `secoes` |
| Atividades | `src/pages/atividades.html` | Cadastrar, listar, editar e excluir atividades. | `atividades` |
| Conquistas | `src/pages/conquistas.html` | Cadastrar, listar, editar e excluir conquistas. | `conquistas` |
| Avisos | `src/pages/avisos.html` | Publicar, consultar, editar e excluir avisos. | `listaAvisos` |

A página `src/index.html` oferece acesso aos cinco módulos.

## Tecnologias utilizadas

- HTML.
- JavaScript.
- Tailwind CSS, carregado por CDN.
- LocalStorage.
- JSON para serialização e recuperação dos registros.
- Apache do XAMPP para servir a aplicação localmente.

A estilização carregada por CDN depende de acesso à internet. Os registros ficam no navegador, sem uso do MySQL nesta entrega.

## Armazenamento dos dados

Os scripts representam os registros como listas de objetos JavaScript. Para persistir e recuperar essas listas, utilizam:

- `localStorage.setItem()` e `JSON.stringify()` para salvar.
- `localStorage.getItem()` e `JSON.parse()` para recuperar.

Os dados permanecem disponíveis após recarregar a página ou fechar e reabrir o navegador, desde que o armazenamento não seja apagado. O LocalStorage pertence à origem da aplicação, definida por protocolo, domínio e porta, e ao perfil do navegador.

Outro navegador ou uma janela anônima não compartilha os registros da sessão normal. Na janela anônima, o armazenamento é temporário e pode ser removido ao encerrar todas as janelas anônimas.

## Como executar a versão entregue

1. Abra o link do commit de referência acima.
2. Na página dessa versão, use **Code → Download ZIP** e extraia o conteúdo. Renomeie a pasta extraída para `base-camp` e copie-a para `C:\xampp\htdocs\`.
3. Confira se o caminho do arquivo inicial é `C:\xampp\htdocs\base-camp\src\index.html`.
4. Abra o XAMPP Control Panel e inicie o **Apache**.
5. No navegador, acesse `http://localhost/base-camp/src/`.
6. Utilize o menu para abrir os cinco CRUDs.

Não é necessário iniciar o MySQL ou importar arquivos SQL para executar essa versão. Se já houver outra pasta `base-camp` em `htdocs`, extraia a entrega em uma pasta separada e ajuste o endereço no navegador para o nome escolhido.

## Estrutura do código entregue

```text
base-camp/
├── README.md
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

A grafia `assests` corresponde à pasta existente na entrega e deve ser preservada nessa cópia, pois os caminhos dos scripts dependem dela.

## Roteiro de verificação

O roteiro abaixo permite conferir manualmente cada CRUD. Ele não constitui um registro de testes já executados no navegador.

| Etapa | Ação | Resultado esperado |
| --- | --- | --- |
| Cadastro | Preencher os campos e cadastrar um registro de teste. | O registro aparece na listagem ou nos cards. |
| Consulta | Recarregar a página e consultar o registro. | O registro continua disponível. |
| Edição | Carregar o registro, alterar seus dados e salvar. | A listagem apresenta os valores atualizados. |
| Persistência da edição | Recarregar novamente a página. | Os valores alterados continuam salvos. |
| Exclusão | Excluir o registro de teste. | O registro desaparece da listagem. |
| Persistência da exclusão | Recarregar a página. | O registro excluído não reaparece. |
| Armazenamento | Conferir a chave do módulo no LocalStorage pelas ferramentas do navegador. | O conteúdo corresponde à lista de objetos serializada em JSON. |
| Ambiente separado | Abrir em outro navegador ou janela anônima e repetir as operações. | O CRUD funciona com seu próprio armazenamento, sem exigir os registros do navegador original. |

Repita o roteiro nos cinco módulos. Use registros fictícios e não apague o armazenamento inteiro do navegador apenas para testar um módulo.

## Relação com as demais disciplinas

Os CRUDs representam assuntos presentes nos requisitos e na modelagem de Banco de Dados. Contudo, a primeira entrega de Web utiliza apenas LocalStorage e não precisa implementar todos os recursos da versão final do BaseCamp.

A integração entre os módulos, a autenticação, as permissões e a persistência em MySQL fazem parte da evolução do sistema.

- [Engenharia de Requisitos](../engenharia-de-requisitos/README.md).
- [Arquitetura de Banco de Dados](../arquitetura-de-banco-de-dados/README.md).

## Organização desta documentação

```text
desenvolvimento-web/
└── README.md
```

O código em desenvolvimento permanece no repositório principal. O commit de referência permite consultar e baixar a versão registrada sem duplicar seus arquivos na documentação.
