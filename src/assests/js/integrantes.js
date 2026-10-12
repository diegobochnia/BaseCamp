const STORAGE_KEY = "integrantes";

const nomeInput = document.getElementById("nome");
const nascimentoInput = document.getElementById("nascimento");
const telefoneInput = document.getElementById("telefone");
const secoesSelect = document.getElementById("secoes");
const addButton = document.getElementById("add-integrante");
const tableBody = document.getElementById("integrantes-table-body");

let editandoIndex = null;

function getIntegrantes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveIntegrantes(integrantes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(integrantes));
}

function limparFormulario() {
    nomeInput.value = "";
    nascimentoInput.value = "";
    telefoneInput.value = "";
    secoesSelect.value = "";
    addButton.value = "Adicionar";
    editandoIndex = null;
}

function renderIntegrantes() {
    const integrantes = getIntegrantes();
    tableBody.innerHTML = "";

    if (integrantes.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-4 py-6 text-center text-zinc-400">Nenhum integrante cadastrado.</td>
            </tr>
        `;
        return;
    }

    integrantes.forEach((integrante, index) => {
        const row = document.createElement("tr");
        row.className = "hover:bg-zinc-50 transition";
        row.innerHTML = `
            <td class="px-4 py-2">${integrante.nome}</td>
            <td class="px-4 py-2">${integrante.nascimento}</td>
            <td class="px-4 py-2">${integrante.telefone}</td>
            <td class="px-4 py-2">
                <span class="bg-green-100 text-green-900 text-xs font-medium px-2 py-1 rounded-full capitalize">${integrante.secao}</span>
            </td>
            <td class="px-4 py-2 space-x-3">
                <button class="text-green-900 hover:underline cursor-pointer" data-action="editar" data-index="${index}">Editar</button>
                <button class="text-red-700 hover:underline cursor-pointer" data-action="excluir" data-index="${index}">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

addButton.addEventListener("click", () => {
    if (!nomeInput.value || !nascimentoInput.value || !telefoneInput.value || !secoesSelect.value) {
        alert("Preencha todos os campos.");
        return;
    }

    const integrante = {
        nome: nomeInput.value,
        nascimento: nascimentoInput.value,
        telefone: telefoneInput.value,
        secao: secoesSelect.value,
    };

    const integrantes = getIntegrantes();

    if (editandoIndex !== null) {
        integrantes[editandoIndex] = integrante;
    } else {
        integrantes.push(integrante);
    }

    saveIntegrantes(integrantes);
    limparFormulario();
    renderIntegrantes();
});

tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const index = Number(button.dataset.index);
    const integrantes = getIntegrantes();

    if (button.dataset.action === "excluir") {
        integrantes.splice(index, 1);
        saveIntegrantes(integrantes);
        renderIntegrantes();
    }

    if (button.dataset.action === "editar") {
        const integrante = integrantes[index];
        nomeInput.value = integrante.nome;
        nascimentoInput.value = integrante.nascimento;
        telefoneInput.value = integrante.telefone;
        secoesSelect.value = integrante.secao;
        addButton.value = "Salvar";
        editandoIndex = index;
    }
});

renderIntegrantes();
