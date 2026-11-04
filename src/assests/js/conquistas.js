// URL base da pasta onde estão os endpoints PHP das conquistas
const URL_BASE = '../php/conquistas/';

// Executa ao carregar o DOM da página
document.addEventListener('DOMContentLoaded', () => {
  listarConquistas();

  const formConquista = document.getElementById('form-conquista') || document.querySelector('form');
  if (formConquista) {
    formConquista.addEventListener('submit', salvarConquista);
  }
});

/**
 * READ: Busca as conquistas no banco de dados e monta a tabela/lista
 */
async function listarConquistas() {
  try {
    const resposta = await fetch(`${URL_BASE}conquista_get.php`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const conquistas = await resposta.json();
    const tabela =
      document.getElementById('tabela-conquistas') || document.getElementById('lista-conquistas');

    if (!tabela) return;

    tabela.innerHTML = '';

    if (conquistas.length === 0) {
      tabela.innerHTML =
        '<tr><td colspan="4" class="text-center py-4 text-gray-500">Nenhuma conquista cadastrada.</td></tr>';
      return;
    }

    conquistas.forEach(conquista => {
      const tr = document.createElement('tr');
      tr.className = 'border-b hover:bg-gray-50';

      tr.innerHTML = `
                <td class="py-2 px-4">${conquista.id_conquista}</td>
                <td class="py-2 px-4 font-medium">${conquista.nome}</td>
                <td class="py-2 px-4">${conquista.criterios}</td>
                <td class="py-2 px-4 flex gap-2">
                    <button onclick="carregarParaEditar('${conquista.id_conquista}', '${conquista.nome.replace(/'/g, "\\'")}', '${conquista.criterios.replace(/'/g, "\\'")}')"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        Editar
                    </button>
                    <button onclick="excluirConquista(${conquista.id_conquista})"
                            class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                        Excluir
                    </button>
                </td>
            `;

      tabela.appendChild(tr);
    });
  } catch (erro) {
    console.error('Erro ao listar conquistas:', erro);
    alert('Não foi possível carregar as conquistas.');
  }
}

/**
 * CREATE e UPDATE: Cadastra ou edita dependendo da presença do id_conquista
 */
async function salvarConquista(event) {
  event.preventDefault();

  const idInput = document.getElementById('id_conquista');
  const nomeInput = document.getElementById('nome');
  const criteriosInput = document.getElementById('criterios');

  const id = idInput ? idInput.value : '';
  const nome = nomeInput.value.trim();
  const criterios = criteriosInput.value.trim();

  if (!nome || !criterios) {
    alert('Por favor, preencha o nome e os critérios da conquista.');
    return;
  }

  // Cria o FormData simulando envio de formulário padrão (capturado pelo $_POST no PHP)
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('criterios', criterios);

  let urlFinal = `${URL_BASE}conquista_novo.php`;

  // Se houver um ID preenchido no input oculto, vira um UPDATE
  if (id) {
    formData.append('id_conquista', id);
    urlFinal = `${URL_BASE}conquista_alterar.php`;
  }

  try {
    const resposta = await fetch(urlFinal, {
      method: 'POST',
      body: formData,
    });

    const mensagem = await resposta.text();

    if (resposta.ok) {
      alert(mensagem);
      limparFormulario();
      listarConquistas();
    } else {
      alert(`Falha: ${mensagem}`);
    }
  } catch (erro) {
    console.error('Erro ao salvar conquista:', erro);
    alert('Erro de conexão com o servidor.');
  }
}

/**
 * Prepara o formulário para edição ao clicar no botão "Editar"
 */
function carregarParaEditar(id, nome, criterios) {
  let idInput = document.getElementById('id_conquista');
  if (!idInput) {
    idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.id = 'id_conquista';
    const form = document.getElementById('form-conquista') || document.querySelector('form');
    form.appendChild(idInput);
  }

  idInput.value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('criterios').value = criterios;

  // Altera o texto do botão de envio para indicar a edição
  const btnSubmit = document.querySelector('button[type="submit"]');
  if (btnSubmit) {
    btnSubmit.textContent = 'Atualizar Conquista';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * DELETE: Exclui uma conquista pelo ID via requisição POST
 */
async function excluirConquista(id) {
  if (!confirm('Deseja realmente excluir esta conquista?')) {
    return;
  }

  const formData = new FormData();
  formData.append('id_conquista', id);

  try {
    const resposta = await fetch(`${URL_BASE}conquista_excluir.php`, {
      method: 'POST',
      body: formData,
    });

    const mensagem = await resposta.text();

    if (resposta.ok) {
      alert(mensagem);
      listarConquistas();
    } else {
      alert(`Falha ao excluir: ${mensagem}`);
    }
  } catch (erro) {
    console.error('Erro ao excluir conquista:', erro);
    alert('Erro ao tentar conectar ao servidor.');
  }
}

/**
 * Limpa os campos e redefine o botão após cadastro/edição
 */
function limparFormulario() {
  const idInput = document.getElementById('id_conquista');
  if (idInput) idInput.value = '';

  const nomeInput = document.getElementById('nome');
  if (nomeInput) nomeInput.value = '';

  const criteriosInput = document.getElementById('criterios');
  if (criteriosInput) criteriosInput.value = '';

  const btnSubmit = document.querySelector('button[type="submit"]');
  if (btnSubmit) {
    btnSubmit.textContent = 'Cadastrar Conquista';
  }
}
