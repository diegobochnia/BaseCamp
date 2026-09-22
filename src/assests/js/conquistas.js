document.getElementById('btn').addEventListener('click', () => {
  const conquistas_name = document.getElementById('conquistas_name').value.trim();
  const conquistas_desc = document.getElementById('conquistas_desc').value.trim();

  if (!conquistas_name || !conquistas_desc) {
    return;
  }

  let lista = JSON.parse(localStorage.getItem('conquistas')) || [];
  lista.push({ nome: conquistas_name, descricao: conquistas_desc });
  localStorage.setItem('conquistas', JSON.stringify(lista));

  document.getElementById('conquistas_name').value = '';
  document.getElementById('conquistas_desc').value = '';
  document.getElementById('alterar').innerHTML = '';

  listar();
});

function listar() {
  const lista = JSON.parse(localStorage.getItem('conquistas')) || [];
  const corpoTabela = document.getElementById('corpoTabela');

  corpoTabela.innerHTML = '';

  if (lista.length === 0) {
    corpoTabela.innerHTML = `
      <tr>
        <td colspan="4" class="px-4 py-6 text-center text-gray-500">
          Nenhuma conquista cadastrada.
        </td>
      </tr>`;
    return;
  }

  lista.forEach((conquista, indice) => {
    const idExibido = indice + 1;

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
      </tr>`;
  });
}

function excluir(indice) {
  const lista = JSON.parse(localStorage.getItem('conquistas')) || [];
  lista.splice(indice, 1);
  localStorage.setItem('conquistas', JSON.stringify(lista));
  document.getElementById('alterar').innerHTML = '';
  listar();
}

function carregar(indice) {
  const lista = JSON.parse(localStorage.getItem('conquistas')) || [];
  document.getElementById('conquistas_name').value = lista[indice].nome;
  document.getElementById('conquistas_desc').value = lista[indice].descricao;
  document.getElementById('alterar').innerHTML = `
    <button
      type="button"
      class="rounded-md bg-green-800 px-5 py-2 font-medium text-white transition hover:bg-green-900"
      onclick="alterar(${indice})">
      Alterar
    </button>`;
}

function alterar(indice) {
  const lista = JSON.parse(localStorage.getItem('conquistas')) || [];
  lista[indice].nome = document.getElementById('conquistas_name').value.trim();
  lista[indice].descricao = document.getElementById('conquistas_desc').value.trim();

  if (!lista[indice].nome || !lista[indice].descricao) {
    return;
  }

  document.getElementById('alterar').innerHTML = '';
  localStorage.setItem('conquistas', JSON.stringify(lista));
  listar();
}

listar();
