document.addEventListener("DOMContentLoaded", () => {
    carregarAvisos();
});

document.getElementById('avisoPublicar').addEventListener('click', () => {
    const titulo = document.getElementById('avisoTitulo').value
    const mensagem = document.getElementById('avisoMensagem').value
    const dataP = document.getElementById('avisoData').value

    if (!titulo || !mensagem || !dataP) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    criaAviso(titulo, mensagem, dataP);

    document.getElementById('avisoTitulo').value = "";
    document.getElementById('avisoMensagem').value = "";
    document.getElementById('avisoData').value = "";
});

function criaAviso(titulo, mensagem, data) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")) || [];
    listaAvisos.push({ titulo: titulo, mensagem: mensagem, data: data });
    localStorage.setItem("listaAvisos", JSON.stringify(listaAvisos));
    exibirAviso(titulo, mensagem, data, listaAvisos.length - 1);
};

function exibirAviso(titulo, mensagem, data, indice) {
    const dataFormatada = data.split("-").reverse().join("/");
    const cardsAvisos = document.getElementById('cardsAvisos');

    cardsAvisos.innerHTML += `
        <div class="border border-black rounded-2xl p-4 bg-white shadow-sm space-y-2 mb-4">
            <h3 class="font-bold text-lg text-green-800">${titulo}</h3>
            <p class="text-gray-600">${mensagem}</p>
            <span class="text-xs text-gray-400 block">Publicado em: ${dataFormatada}</span>
            <button type="button" onclick="excluirAviso(${indice})"
                class="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700">
                Excluir
            </button>
            <button type="button" onclick="alterarAviso(${indice})"
                class="ml-2 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600">
                Alterar
            </button>
        </div>
    `;
}

function carregarAvisos() {
    document.getElementById('cardsAvisos').innerHTML = "";

    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")) || [];

    for (let i = 0; i < listaAvisos.length; i++) {
        exibirAviso(listaAvisos[i].titulo, listaAvisos[i].mensagem, listaAvisos[i].data, i);
    }
};

function excluirAviso(indice) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos"));
    listaAvisos.splice(indice, 1);
    localStorage.setItem("listaAvisos", JSON.stringify(listaAvisos));
    carregarAvisos();
};

function alterarAviso(indice) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos"));
    document.getElementById('avisoTitulo').value = listaAvisos[indice].titulo;
    document.getElementById('avisoMensagem').value = listaAvisos[indice].mensagem;
    document.getElementById('avisoData').value = listaAvisos[indice].data;
    document.getElementById('areaSalvarAviso').innerHTML =
        `<button type="button" onclick="salvarAlteracao(${indice})"
        class="rounded-xl bg-amber-500 px-6 py-2.5 text-white font-medium hover:bg-amber-600">
        Salvar alteração
    </button>`;
    document.getElementById('avisoPublicar').classList.add('hidden');
};

function salvarAlteracao(indice) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos"));

    const titulo = document.getElementById('avisoTitulo').value;
    const mensagem = document.getElementById('avisoMensagem').value;
    const data = document.getElementById('avisoData').value;

    if (!titulo || !mensagem || !data) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    listaAvisos[indice].titulo = titulo;
    listaAvisos[indice].mensagem = mensagem;
    listaAvisos[indice].data = data;

    localStorage.setItem("listaAvisos", JSON.stringify(listaAvisos));
    carregarAvisos();

    document.getElementById('formAviso').reset();
    document.getElementById('areaSalvarAviso').innerHTML = "";
    document.getElementById('avisoPublicar').classList.remove('hidden');
};