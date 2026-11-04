const URL_BASE = '../php/conquistas/';

document.addEventListener('DOMContentLoaded', () => {
  listarConquistas();

  const btnSalvar = document.getElementById('btnSalvar');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', salvarConquista);
  }
});

async function listarConquistas() {
  try {
    const resposta = await fetch(`${URL_BASE}conquista_get.php`);
    const json = await resposta.json();

    const tbody = document.getElementById('corpoTabela');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (json.status !== 'ok') {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center">${json.mensagem}</td></tr>`;
      return;
    }

    json.data.forEach(conquista => {
      const tr = document.createElement('tr');
      tr.className = 'border-b hover:bg-gray-50';

      const tdId = document.createElement('td');
      tdId.className = 'py-2 px-4';
      tdId.textContent = conquista.id_conquista;

      const tdNome = document.createElement('td');
      tdNome.className = 'py-2 px-4 font-medium';
      tdNome.textContent = conquista.nome;

      const tdDesc = document.createElement('td');
      tdDesc.className = 'py-2 px-4';
      tdDesc.textContent = conquista.descricao;

      const tdCriterios = document.createElement('td');
      tdCriterios.className = 'py-2 px-4';
      tdCriterios.textContent = conquista.criterios;

      const tdAcoes = document.createElement('td');
      tdAcoes.className = 'py-2 px-4 flex gap-2';

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'bg-blue-600 text-white px-3 py-1 rounded text-sm';
      btnEditar.addEventListener('click', () => carregarParaEditar(conquista));

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.className = 'bg-red-600 text-white px-3 py-1 rounded text-sm';
      btnExcluir.addEventListener('click', () => excluirConquista(conquista.id_conquista));

      tdAcoes.append(btnEditar, btnExcluir);
      tr.append(tdId, tdNome, tdDesc, tdCriterios, tdAcoes);
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error('Erro ao listar:', erro);
  }
}

async function salvarConquista() {
  const id = document.getElementById('id_conquista')?.value || '';
  const nome = document.getElementById('conquistas_name').value.trim();
  const descricao = document.getElementById('conquistas_desc').value.trim();
  const criterios = document.getElementById('conquistas_criterios')?.value.trim() || '';

  if (!nome || !descricao || !criterios) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const formData = new FormData();
  formData.append('conquistas_name', nome);
  formData.append('conquistas_desc', descricao);
  formData.append('conquistas_criterios', criterios);

  let url = `${URL_BASE}conquista_novo.php`;
  if (id) {
    formData.append('id_conquista', id);
    url = `${URL_BASE}conquista_alterar.php`;
  }

  try {
    const resposta = await fetch(url, { method: 'POST', body: formData });
    const json = await resposta.json();

    alert(json.mensagem);
    if (json.status === 'ok') {
      limparFormulario();
      listarConquistas();
    }
  } catch (erro) {
    console.error('Erro no salvamento:', erro);
  }
}

function carregarParaEditar(conquista) {
  let idInput = document.getElementById('id_conquista');
  if (!idInput) {
    idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.id = 'id_conquista';
    document.body.appendChild(idInput);
  }
  idInput.value = conquista.id_conquista;
  document.getElementById('conquistas_name').value = conquista.nome;
  document.getElementById('conquistas_desc').value = conquista.descricao;

  if (document.getElementById('conquistas_criterios')) {
    document.getElementById('conquistas_criterios').value = conquista.criterios;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function excluirConquista(id) {
  if (!confirm('Confirmar exclusão?')) return;

  const formData = new FormData();
  formData.append('id_conquista', id);

  try {
    const resposta = await fetch(`${URL_BASE}conquista_excluir.php`, {
      method: 'POST',
      body: formData,
    });
    const json = await resposta.json();

    alert(json.mensagem);
    if (json.status === 'ok') listarConquistas();
  } catch (erro) {
    console.error('Erro na exclusão:', erro);
  }
}

function limparFormulario() {
  if (document.getElementById('id_conquista')) document.getElementById('id_conquista').value = '';
  document.getElementById('conquistas_name').value = '';
  document.getElementById('conquistas_desc').value = '';
  if (document.getElementById('conquistas_criterios'))
    document.getElementById('conquistas_criterios').value = '';
}
