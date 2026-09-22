const chaveLocalStorage = "secoes";
const botaoAdicionar = document.getElementById("adicionarTexto");

botaoAdicionar.addEventListener("click", () => {
    const id = document.getElementById("inputId").value.trim();
    const nome = document.getElementById("inputNome").value.trim();
    const ramo = document.getElementById("ramos").value;
    const secoes = obterSecoes();

    if (!id || !nome || !ramo) {
        document.getElementById("Resultado").textContent = "Preencha todos os campos.";
        return;
    }

    secoes.push({ id, nome, ramo });
    salvarSecoes(secoes);
    limparFormulario();
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
                    <button type="button" class="rounded bg-red-700 px-2 py-1 text-white" onclick="excluir(${indice})">
                        Excluir
                    </button>
                </td>
            </tr>`;
    });
}

function excluir(indice) {
    const secoes = obterSecoes();
    secoes.splice(indice, 1);
    salvarSecoes(secoes);
    listar();
}

function limparFormulario() {
    document.getElementById("inputId").value = "";
    document.getElementById("inputNome").value = "";
    document.getElementById("ramos").value = "";
    document.getElementById("Resultado").textContent = "Seção adicionada com sucesso.";
}

listar();