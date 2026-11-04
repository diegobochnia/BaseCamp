const chaveLocalStorage = "secoes";
const botaoAdicionar = document.getElementById("adicionarTexto");

botaoAdicionar.addEventListener("click", () => {
    const nome = document.getElementById("inputNome").value.trim();
    const ramo = document.getElementById("ramos").value;
    const secoes = obterSecoes();

    if (!nome || !ramo) {
        document.getElementById("Resultado").textContent = "Preencha todos os campos.";
        return;
    }

    // Usa um número maior que os IDs já existentes.
    const maiorId = Math.max(0, ...secoes.map(secao => Number(secao.id) || 0));
    const id = maiorId + 1;

    secoes.push({ id, nome, ramo });
    salvarSecoes(secoes);
    limparFormulario("Seção adicionada com sucesso.");
    listar();
});

function obterSecoes() {
    return JSON.parse(localStorage.getItem(chaveLocalStorage)) || [];
}

function salvarSecoes(secoes) {
    localStorage.setItem(chaveLocalStorage, JSON.stringify(secoes));
}

function listar() {
    const corpoTabela = document.getElementById("corpoTabela");
    const secoes = obterSecoes();

    corpoTabela.innerHTML = "";

    secoes.forEach((secao, indice) => {
        corpoTabela.innerHTML += `
            <tr>
                <td class="border border-green-900 px-4 py-2">${secao.id}</td>
                <td class="border border-green-900 px-4 py-2">${secao.nome}</td>
                <td class="border border-green-900 px-4 py-2">${secao.ramo}</td>
                <td class="border border-green-900 px-4 py-2">
                    <button type="button"
                        class="rounded bg-amber-500 px-2 py-1 text-white"
                        onclick="carregar(${indice})">
                        Editar
                    </button>
                    <button type="button"
                        class="rounded bg-red-700 px-2 py-1 text-white"
                        onclick="excluir(${indice})">
                        Excluir
                    </button>
                </td>
            </tr>`;
    });
}

function carregar(indice) {
    const secoes = obterSecoes();
    const secao = secoes[indice];

    document.getElementById("inputNome").value = secao.nome;
    document.getElementById("ramos").value = secao.ramo;

    document.getElementById("areaAlterar").innerHTML = `
        <button type="button"
            class="rounded bg-amber-500 px-4 py-2 text-white"
            onclick="alterar(${indice})">
            Salvar alteração
        </button>
        <button type="button"
            class="rounded border px-4 py-2"
            onclick="cancelarEdicao()">
            Cancelar
        </button>
    `;

    botaoAdicionar.classList.add("hidden");
    document.getElementById("Resultado").textContent = "Editando seção.";
}

function alterar(indice) {
    const nome = document.getElementById("inputNome").value.trim();
    const ramo = document.getElementById("ramos").value;

    if (!nome || !ramo) {
        document.getElementById("Resultado").textContent = "Preencha todos os campos.";
        return;
    }

    const secoes = obterSecoes();
    secoes[indice].nome = nome;
    secoes[indice].ramo = ramo;

    salvarSecoes(secoes);
    limparFormulario("Seção alterada com sucesso.");
    listar();
}

function excluir(indice) {
    const secoes = obterSecoes();
    secoes.splice(indice, 1);

    salvarSecoes(secoes);
    limparFormulario("Seção excluída com sucesso.");
    listar();
}

function cancelarEdicao() {
    limparFormulario("");
}

function limparFormulario(mensagem) {
    document.getElementById("inputNome").value = "";
    document.getElementById("ramos").value = "";
    document.getElementById("areaAlterar").innerHTML = "";
    document.getElementById("Resultado").textContent = mensagem;
    botaoAdicionar.classList.remove("hidden");
}

listar();