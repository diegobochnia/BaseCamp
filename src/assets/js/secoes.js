const URL_BASE = "../assets/php/secoes/";
const formulario = document.getElementById("formSecao");
const botaoAdicionar = document.getElementById("adicionarTexto");
const campoNome = document.getElementById("inputNome");
const campoId = document.getElementById("id_secao");
const seletorGrupo = document.getElementById("grupos");
const seletorRamo = document.getElementById("ramos");
const corpoTabela = document.getElementById("corpoTabela");
const resultado = document.getElementById("Resultado");

botaoAdicionar.addEventListener("click", salvar);
document.getElementById("cancelarEdicao").addEventListener("click", cancelarEdicao);

async function listar() {
    try {
        const resposta = await fetch(`${URL_BASE}listar_secoes.php`);
        const json = await resposta.json();
        if (!resposta.ok || json.status !== "ok") {
            throw new Error(json.mensagem || "Falha ao carregar as seções.");
        }

        preencherOpcoes(seletorGrupo, json.grupos, "Selecione o grupo", "id_grupo");
        preencherOpcoes(seletorRamo, json.ramos, "Selecione o ramo", "id_ramo");
        corpoTabela.replaceChildren();

        json.data.forEach(secao => {
            const linha = document.createElement("tr");
            linha.className = "border-b";

            [secao.id_secao, secao.nome, secao.ramo, secao.grupo].forEach(valor => {
                const celula = document.createElement("td");
                celula.className = "border border-green-900 px-4 py-2";
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const celulaAcoes = document.createElement("td");
            celulaAcoes.className = "border border-green-900 px-4 py-2";

            const botaoEditar = document.createElement("button");
            botaoEditar.type = "button";
            botaoEditar.className = "mr-2 rounded bg-amber-500 px-2 py-1 text-white";
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", () => carregar(secao));

            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.className = "rounded bg-red-700 px-2 py-1 text-white";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.addEventListener("click", () => excluir(secao.id_secao));

            celulaAcoes.append(botaoEditar, botaoExcluir);
            linha.appendChild(celulaAcoes);
            corpoTabela.appendChild(linha);
        });
    } catch (erro) {
        console.error("Erro ao listar seções:", erro);
        resultado.textContent = erro.message;
    }
}

function preencherOpcoes(seletor, opcoes, textoInicial, chaveId) {
    seletor.replaceChildren(new Option(textoInicial, ""));
    opcoes.forEach(opcao => seletor.add(new Option(opcao.nome, opcao[chaveId])));
}

async function salvar() {
    const nome = campoNome.value.trim();
    const idGrupo = seletorGrupo.value;
    const idRamo = seletorRamo.value;

    if (!nome || !idGrupo || !idRamo) {
        resultado.textContent = "Preencha o nome, o grupo e o ramo.";
        return;
    }

    const dados = new FormData(formulario);
    const endpoint = campoId.value ? "alterar_secoes.php" : "cadastrar_secoes.php";

    try {
        const resposta = await fetch(`${URL_BASE}${endpoint}`, { method: "POST", body: dados });
        const json = await resposta.json();
        resultado.textContent = json.mensagem;
        if (!resposta.ok || json.status !== "ok") return;

        limparFormulario();
        await listar();
    } catch (erro) {
        console.error("Erro ao salvar seção:", erro);
        resultado.textContent = "Não foi possível salvar a seção.";
    }
}

function carregar(secao) {
    campoId.value = secao.id_secao;
    campoNome.value = secao.nome;
    seletorGrupo.value = secao.id_grupo;
    seletorRamo.value = secao.id_ramo;
    botaoAdicionar.textContent = "Salvar alteração";
    document.getElementById("cancelarEdicao").classList.remove("hidden");
    resultado.textContent = "Editando seção.";
}

async function excluir(idSecao) {
    if (!confirm("Deseja excluir esta seção?")) return;

    const dados = new FormData();
    dados.append("id_secao", idSecao);

    try {
        const resposta = await fetch(`${URL_BASE}excluir_secoes.php`, { method: "POST", body: dados });
        const json = await resposta.json();
        resultado.textContent = json.mensagem;
        if (!resposta.ok || json.status !== "ok") return;

        if (campoId.value === String(idSecao)) limparFormulario();
        await listar();
    } catch (erro) {
        console.error("Erro ao excluir seção:", erro);
        resultado.textContent = "Não foi possível excluir a seção.";
    }
}

function cancelarEdicao() {
    limparFormulario();
    resultado.textContent = "";
}

function limparFormulario() {
    campoId.value = "";
    campoNome.value = "";
    seletorGrupo.value = "";
    seletorRamo.value = "";
    botaoAdicionar.textContent = "Adicionar Seção";
    document.getElementById("cancelarEdicao").classList.add("hidden");
}