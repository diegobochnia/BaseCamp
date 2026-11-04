const URL_BASE = '../assets/php/conquistas/';

document.addEventListener('DOMContentLoaded', () => {
  listarConquistas();

  const btnSalvar = document.getElementById('btnSalvar');
  const btnCancelar = document.getElementById('btnCancelar');

  if (btnSalvar) btnSalvar.addEventListener('click', salvarConquista);
  if (btnCancelar) btnCancelar.addEventListener('click', limparFormulario);
});

async function listarConquistas() {
  try {
    const resposta = await fetch(`${URL_BASE}listar_conquistas.php`);
    const json = await resposta.json();

    const tbody = document.getElementById('corpoTabela');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (json.status !== 'ok') {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4">${json.mensagem}</td></tr>`;
      return;
    }

    json.data.forEach(conquista => {
      const tr = document.createElement('tr');
      tr.className = 'border-b hover:bg-gray-50';

      tr.innerHTML = `
        <td class="py-2 px-4">${conquista.id_conquista}</td>
        <td class="py-2 px-4 font-medium">${conquista.nome}</td>
        <td class="py-2 px-4">${conquista.descricao}</td>
        <td class="py-2 px-4">${conquista.criterios}</td>
        <td class="py-2 px-4 flex gap-2 justify-center">
            <button class="btn-editar bg-blue-600 text-white px-3 py-1 rounded text-sm">Editar</button>
            <button class="btn-excluir bg-red-600 text-white px-3 py-1 rounded text-sm">Excluir</button>
        </td>
      `;

      tr.querySelector('.btn-editar').addEventListener('click', () =>
        carregarParaEditar(conquista),
      );
      tr.querySelector('.btn-excluir').addEventListener('click', () =>
        excluirConquista(conquista.id_conquista),
      );

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

  let url = `${URL_BASE}cadastrar_conquistas.php`;
  if (id) {
    formData.append('id_conquista', id);
    url = `${URL_BASE}alterar_conquistas.php`;
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

  // Mostra o botão cancelar e muda o texto do botão salvar
  document.getElementById('btnCancelar').classList.remove('hidden');
  document.getElementById('btnSalvar').textContent = 'Atualizar';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function excluirConquista(id) {
  if (!confirm('Confirmar exclusão?')) return;

  const formData = new FormData();
  formData.append('id_conquista', id);

  try {
    const resposta = await fetch(`${URL_BASE}excluir_conquistas.php`, {
      method: 'POST',
      body: formData,
    });
    const json = await resposta.json();

    alert(json.mensagem);
    if (json.status === 'ok') {
      listarConquistas();
      limparFormulario(); // Limpa se estava editando o item excluído
    }
  } catch (erro) {
    console.error('Erro na exclusão:', erro);
  }
}

function limparFormulario() {
  const idInput = document.getElementById('id_conquista');
  if (idInput) idInput.value = '';

  document.getElementById('conquistas_name').value = '';
  document.getElementById('conquistas_desc').value = '';

  const inputCriterios = document.getElementById('conquistas_criterios');
  if (inputCriterios) inputCriterios.value = '';

  const btnCancelar = document.getElementById('btnCancelar');
  if (btnCancelar) btnCancelar.classList.add('hidden');

  const btnSalvar = document.getElementById('btnSalvar');
  if (btnSalvar) btnSalvar.textContent = 'Enviar';
}
