document.getElementById('btn').addEventListener('click', () => {
  let conquistas_id = document.getElementById('conquistas_id').value;
  let conquistas_name = document.getElementById('conquistas_name').value;
  let conquistas_desc = document.getElementById('conquistas_desc').value;
  let lista = JSON.parse(localStorage.getItem('conquistas'));
  if (!lista) {
    lista = [];
  }
  lista.push({ id: conquistas_id, nome: conquistas_name, descricao: conquistas_desc });
  localStorage.setItem('conquistas', JSON.stringify(lista));
  listar();
});

function listar() {
  let lista = JSON.parse(localStorage.getItem('conquistas')) || [];
  document.getElementById('p_des').innerHTML = '';

  let indice = 0;
  for (let conquista of lista) {
    document.getElementById('p_des').innerHTML += `
        <li>${conquista.id} | ${conquista.nome} | ${conquista.descricao}
        <button onclick="excluir(${indice})">Excluir</button>
        <button onclick="carregar(${indice})">Carregar</button></li>`;
    indice++;
  }
}

function excluir(indice) {
  let lista = JSON.parse(localStorage.getItem('conquistas'));
  lista.splice(indice, 1);
  localStorage.setItem('conquistas', JSON.stringify(lista));
  listar();
}

function carregar(indice) {
  let lista = JSON.parse(localStorage.getItem('conquistas'));
  document.getElementById('conquistas_id').value = lista[indice].id;
  document.getElementById('conquistas_name').value = lista[indice].nome;
  document.getElementById('conquistas_desc').value = lista[indice].descricao;
  document.getElementById('alterar').innerHTML =
    `<button onclick=alterar(${indice})>Alterar</button>`;
}

function alterar(indice) {
  let lista = JSON.parse(localStorage.getItem('conquistas'));
  lista[indice].id = document.getElementById('conquistas_id').value;
  lista[indice].nome = document.getElementById('conquistas_name').value;
  lista[indice].descricao = document.getElementById('conquistas_desc').value;
  document.getElementById('alterar').innerHTML = '';
  localStorage.setItem('conquistas', JSON.stringify(lista));
  listar();
}
