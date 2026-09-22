document.getElementById('btn').addEventListener('click', () => {
  const conquistas_name = document.getElementById('conquistas_name').value.trim(); //pega o nome digitado no formulário
  const conquistas_desc = document.getElementById('conquistas_desc').value.trim(); //pega a descrição digitada no formulário

  if (!conquistas_name || !conquistas_desc) { //verifica se os campos estão vazios
    return;
  }

  let lista = JSON.parse(localStorage.getItem('conquistas')) || []; //pega a lista salva ou cria um array vazio
  lista.push({ nome: conquistas_name, descricao: conquistas_desc }); //adiciona um objeto com os dados à lista
  localStorage.setItem('conquistas', JSON.stringify(lista)); //converte a lista para string e salva no localStorage

  document.getElementById('conquistas_name').value = ''; //limpa os campos depois do cadastro
  document.getElementById('conquistas_desc').value = '';
  document.getElementById('alterar').innerHTML = '';

  listar(); //atualiza a tabela
});

function listar() { //mostra todas as conquistas salvas no localStorage
  const lista = JSON.parse(localStorage.getItem('conquistas')) || []; //recupera a lista ou cria um array vazio
  const corpoTabela = document.getElementById('corpoTabela'); //pega a área que recebe as conquistas

  corpoTabela.innerHTML = ''; //limpa a tabela para não duplicar os dados

  if (lista.length === 0) { //verifica se a lista está vazia
    corpoTabela.innerHTML = `
      <tr>
        <td colspan="4" class="px-4 py-6 text-center text-gray-500">
          Nenhuma conquista cadastrada.
        </td>
      </tr>`;
    return;
  }

  lista.forEach((conquista, indice) => { //percorre todas as conquistas e pega o índice de cada uma
    const idExibido = indice + 1; //cria um número para exibir na tabela começando em 1

    corpoTabela.innerHTML += `
      <tr>
        <td class="border border-gray-300 px-4 py-3">${idExibido}</td>
        <td class="border border-gray-300 px-4 py-3">${conquista.nome}</td>
        <td class="border border-gray-300 px-4 py-3">${conquista.descricao}</td>
        <td class="border border-gray-300 px-4 py-3">
          <div class="flex justify-center gap-2">
            <button
              type="button"
              class="rounded-md bg-green-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-900"
              onclick="carregar(${indice})">
              Carregar
            </button>
            <button
              type="button"
              class="rounded-md bg-red-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-800"
              onclick="excluir(${indice})">
              Excluir
            </button>
          </div>
        </td>
      </tr>`; //adiciona uma nova linha na tabela
  });
}

function excluir(indice) {
  const lista = JSON.parse(localStorage.getItem('conquistas')) || []; //recupera a lista do localStorage
  lista.splice(indice, 1); //remove a conquista pelo índice
  localStorage.setItem('conquistas', JSON.stringify(lista)); //salva novamente a lista
  document.getElementById('alterar').innerHTML = ''; //remove o botão de alteração
  listar(); //atualiza a tabela
}

function carregar(indice) { //carrega os dados da conquista nos campos
  const lista = JSON.parse(localStorage.getItem('conquistas')) || []; //recupera a lista do localStorage
  document.getElementById('conquistas_name').value = lista[indice].nome;
  document.getElementById('conquistas_desc').value = lista[indice].descricao;
  document.getElementById('alterar').innerHTML = `
    <button
      type="button"
      class="rounded-md bg-green-800 px-5 py-2 font-medium text-white transition hover:bg-green-900"
      onclick="alterar(${indice})">
      Alterar
    </button>`; //adiciona o botão Alterar passando o índice
}

function alterar(indice) {
  const lista = JSON.parse(localStorage.getItem('conquistas')) || []; //recupera a lista do localStorage
  lista[indice].nome = document.getElementById('conquistas_name').value.trim(); //altera os dados na lista
  lista[indice].descricao = document.getElementById('conquistas_desc').value.trim();

  if (!lista[indice].nome || !lista[indice].descricao) { //verifica se os campos estão vazios
    return;
  }

  document.getElementById('alterar').innerHTML = ''; //remove o botão Alterar
  localStorage.setItem('conquistas', JSON.stringify(lista)); //salva as alterações no localStorage
  listar(); //atualiza a tabela
}

listar(); //mostra as conquistas salvas quando a página é aberta