const URL_BASE = "../assets/php/secoes/";
const formulario = document.getElementById("formSecao");
const botaoAdicionar = document.getElementById("adicionarTexto");
const campoNome = document.getElementById("inputNome");
const campoId = document.getElementById("id_secao");
const seletorGrupo = document.getElementById("grupos");
const seletorRamo = document.getElementById("ramos");
const corpoTabela = document.getElementById("corpoTabela");
const resultado = document.getElementById("Resultado");
const botaoCancelar = document.getElementById("cancelarEdicao");

botaoAdicionar.addEventListener("click", salvar);
botaoCancelar.addEventListener("click", cancelarEdicao);

async function solicitarJson(url, opcoes) {
    const resposta = await fetch(url, opcoes);
    const texto = await resposta.text();
    let json;

    try {
        json = JSON.parse(texto);
    } catch (erro) {
        console.error(`Resposta inválida do endpoint ${url} (HTTP ${resposta.status}):`, texto);
        throw new Error(`O PHP não retornou JSON válido (HTTP ${resposta.status}).`);
    }

    if (!resposta.ok || json.status !== "ok") {
        throw new Error(json.mensagem || `O endpoint respondeu com HTTP ${resposta.status}.`);
    }

    return json;
}

async function listar() {
    try {
        const json = await solicitarJson(`${URL_BASE}listar_secoes.php?situacao=ativa`);
        if (!Array.isArray(json.data) || !Array.isArray(json.grupos) || !Array.isArray(json.ramos)) {
            throw new Error("A resposta do PHP não contém as listas de seções, grupos e ramos esperadas.");
        }

        preencherOpcoes(seletorGrupo, json.grupos, "Selecione o grupo", "id_grupo");
        preencherOpcoes(seletorRamo, json.ramos, "Selecione o ramo", "id_ramo");
        corpoTabela.replaceChildren();

        json.data.forEach(secao => {
            const linha = document.createElement("tr");
            linha.className = "border-b";

            [secao.id_secao, secao.nome, secao.ramo, secao.grupo,
                secao.situacao === "inativa" ? "Oculta" : "Ativa"].forEach(valor => {
                const celula = document.createElement("td");
                celula.className = "border border-green-900 px-4 py-2";
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const celulaAcoes = document.createElement("td");
            celulaAcoes.className = "border border-green-900 px-4 py-2";
            const acoes = document.createElement("div");
            acoes.className = "flex flex-wrap justify-center gap-2";

            acoes.append(
                criarBotao("Editar", "rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600", () => carregar(secao)),
                criarBotao("Excluir", "rounded bg-red-700 px-3 py-1 text-white hover:bg-red-800", () => excluir(secao.id_secao))
            );

            celulaAcoes.appendChild(acoes);
            linha.appendChild(celulaAcoes);
            corpoTabela.appendChild(linha);
        });

        if (json.data.length === 0) {
            const linhaVazia = document.createElement("tr");
            const celula = document.createElement("td");
            celula.colSpan = 6;
            celula.className = "border border-green-900 px-4 py-2";
            celula.textContent = "Nenhuma seção ativa.";
            linhaVazia.appendChild(celula);
            corpoTabela.appendChild(linhaVazia);
        }
    } catch (erro) {
        console.error("Erro ao listar seções:", erro);
        resultado.textContent = erro instanceof TypeError
            ? "Não foi possível acessar o PHP. Inicie o Apache no XAMPP e abra a página pelo localhost."
            : erro.message;
    }
}

function criarBotao(texto, classes, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = classes;
    botao.textContent = texto;
    botao.addEventListener("click", acao);
    return botao;
}

function preencherOpcoes(seletor, opcoes, textoInicial, chaveId) {
    const valorSelecionado = seletor.value;
    seletor.replaceChildren(new Option(textoInicial, ""));
    opcoes.forEach(opcao => seletor.add(new Option(opcao.nome, opcao[chaveId])));
    if (opcoes.some(opcao => String(opcao[chaveId]) === valorSelecionado)) {
        seletor.value = valorSelecionado;
    }
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
        const json = await solicitarJson(`${URL_BASE}${endpoint}`, { method: "POST", body: dados });
        limparFormulario();
        await listar();
        resultado.textContent = json.mensagem;
    } catch (erro) {
        console.error("Erro ao salvar seção:", erro);
        resultado.textContent = erro.message;
    }
}

function carregar(secao) {
    campoId.value = secao.id_secao;
    campoNome.value = secao.nome;
    seletorGrupo.value = secao.id_grupo;
    seletorRamo.value = secao.id_ramo;
    botaoAdicionar.textContent = "Salvar alteração";
    botaoCancelar.classList.remove("hidden");
    resultado.textContent = "Editando seção.";
}



async function excluir(idSecao) {
    if (!confirm("Excluir esta seção permanentemente do banco de dados? A operação pode ser recusada se houver registros vinculados.")) {
        return;
    }

    const dados = new FormData();
    dados.append("id_secao", idSecao);

    try {
        const json = await solicitarJson(`${URL_BASE}excluir_secoes.php`, { method: "POST", body: dados });
        if (campoId.value === String(idSecao)) limparFormulario();
        await listar();
        resultado.textContent = json.mensagem;
    } catch (erro) {
        console.error("Erro ao excluir seção:", erro);
        resultado.textContent = erro.message;
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
    botaoCancelar.classList.add("hidden");
}

listar();
