let atividadesCarregadas = [];
let secoes = [];

const campoId = document.getElementById("id_atividade");
const campoNome = document.getElementById("Nome");
const campoInicio = document.getElementById("inicio");
const campoTermino = document.getElementById("termino");
const campoSecao = document.getElementById("id_secao");
const campoLocal = document.getElementById("local");
const campoDescricao = document.getElementById("descricao");
const botaoAdicionar = document.getElementById("btn_add");
const botaoCancelar = document.getElementById("cancelar");
const container = document.getElementById("listaatividades");
const resultado = document.getElementById("resultado");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn_upd").addEventListener("click", listar);
    botaoAdicionar.addEventListener("click", salvar);
    botaoCancelar.addEventListener("click", cancelarEdicao);
    inicializar();
});

async function inicializar() {
    try {
        await carregarSecoes();
        await listar();
    } catch (erro) {
        console.error("Erro ao inicializar atividades:", erro);
        resultado.textContent = mensagemErro(erro);
    }
}

async function salvar() {
    const valores = {
        id_secao: campoSecao.value,
        titulo: campoNome.value.trim(),
        descricao: campoDescricao.value.trim(),
        inicio: paraDataPhp(campoInicio.value),
        termino: paraDataPhp(campoTermino.value),
        local: campoLocal.value.trim(),
        situacao: document.getElementById("situacao").value
    };

    if (!valores.id_secao || !valores.titulo || !campoInicio.value || !campoTermino.value || !valores.local || !valores.descricao) {
        resultado.textContent = "Preencha todos os campos antes de salvar a atividade.";
        return;
    }

    if (new Date(campoTermino.value) < new Date(campoInicio.value)) {
        resultado.textContent = "O término da atividade deve ser igual ou posterior ao início.";
        return;
    }

    const dados = new FormData();
    Object.entries(valores).forEach(([chave, valor]) => dados.append(chave, valor));
    const id = campoId.value;
    const endpoint = id
        ? `../assets/php/atividades/alterar_atividades.php?id_atividade=${encodeURIComponent(id)}`
        : "../assets/php/atividades/cadastrar_atividades.php";

    try {
        const json = await solicitarJson(endpoint, { method: "POST", body: dados });
        limparFormulario();
        if (await listar()) {
            resultado.textContent = json.mensagem;
        }
    } catch (erro) {
        console.error("Erro ao salvar atividade:", erro);
        resultado.textContent = mensagemErro(erro);
    }
}

async function carregarSecoes() {
    const json = await solicitarJson("../assets/php/secoes/listar_secoes.php?situacao=todas");
    if (!Array.isArray(json.data)) {
        throw new Error("A resposta do PHP não contém a lista de seções esperada.");
    }

    secoes = json.data;
    campoSecao.replaceChildren(new Option("Selecione uma seção", ""));
    secoes.forEach(secao => campoSecao.add(new Option(secao.nome, secao.id_secao)));
}

async function listar() {
    try {
        const json = await solicitarJson("../assets/php/atividades/listar_atividades.php?situacao=todas");
        if (!Array.isArray(json.data)) {
            throw new Error("A resposta do PHP não contém a lista de atividades esperada.");
        }

        atividadesCarregadas = json.data;
        container.replaceChildren();
        if (atividadesCarregadas.length === 0) {
            const item = document.createElement("li");
            item.className = "rounded-xl border border-dashed border-green-200 bg-green-50 px-4 py-5 text-sm text-slate-600";
            item.textContent = "Nenhuma atividade cadastrada.";
            container.appendChild(item);
            return true;
        }

        atividadesCarregadas.forEach(atividade => container.appendChild(criarItem(atividade)));
        return true;
    } catch (erro) {
        console.error("Erro ao listar atividades:", erro);
        resultado.textContent = mensagemErro(erro);
        return false;
    }
}

function criarItem(atividade) {
    const item = document.createElement("li");
    item.className = "flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm md:flex-row md:items-center md:justify-between";

    const dados = document.createElement("div");
    dados.className = "min-w-0 flex-1 space-y-1";

    const titulo = document.createElement("p");
    titulo.className = "font-semibold text-green-900";
    titulo.textContent = atividade.titulo;

    const detalhes = document.createElement("p");
    detalhes.className = "text-sm text-slate-600";
    const secao = secoes.find(opcao => String(opcao.id_secao) === String(atividade.id_secao));
    detalhes.textContent = `${formatarData(atividade.inicio)} – ${formatarData(atividade.termino)} • ${secao ? secao.nome : `Seção ${atividade.id_secao}`} • ${atividade.local} • ${atividade.situacao}`;

    const descricao = document.createElement("p");
    descricao.className = "max-w-full whitespace-pre-line text-sm text-slate-700 [overflow-wrap:anywhere]";
    descricao.textContent = atividade.descricao;

    dados.append(titulo, detalhes, descricao);

    const acoes = document.createElement("div");
    acoes.className = "flex shrink-0 gap-2";
    acoes.append(
        criarBotao("Editar", "rounded-md bg-white px-3 py-1.5 text-xs font-medium text-green-800 ring-1 ring-green-200 transition hover:bg-green-100", () => carregar(atividade)),
        criarBotao("Excluir", "rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 ring-1 ring-red-200 transition hover:bg-red-100", () => excluir(atividade.id_atividade))
    );

    item.append(dados, acoes);
    return item;
}

function criarBotao(texto, classes, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = classes;
    botao.textContent = texto;
    botao.addEventListener("click", acao);
    return botao;
}

async function excluir(id) {
    if (!confirm("Excluir esta atividade permanentemente?")) {
        return;
    }

    try {
        const json = await solicitarJson(`../assets/php/atividades/excluir_atividades.php?id=${encodeURIComponent(id)}`);
        if (campoId.value === String(id)) {
            limparFormulario();
        }
        if (await listar()) {
            resultado.textContent = json.mensagem;
        }
    } catch (erro) {
        console.error("Erro ao excluir atividade:", erro);
        resultado.textContent = mensagemErro(erro);
    }
}

function carregar(atividade) {
    campoId.value = atividade.id_atividade;
    campoNome.value = atividade.titulo;
    campoInicio.value = paraCampoData(atividade.inicio);
    campoTermino.value = paraCampoData(atividade.termino);
    campoSecao.value = atividade.id_secao;
    campoLocal.value = atividade.local;
    campoDescricao.value = atividade.descricao;
    document.getElementById("situacao").value = atividade.situacao;
    botaoAdicionar.textContent = "Salvar alteração";
    botaoCancelar.classList.remove("hidden");
    resultado.textContent = "Editando atividade.";
}

function cancelarEdicao() {
    limparFormulario();
    resultado.textContent = "";
}

function paraDataPhp(valor) {
    return `${valor.replace("T", " ")}:00`;
}

function paraCampoData(valor) {
    return valor.replace(" ", "T").slice(0, 16);
}

function formatarData(valor) {
    const data = new Date(valor.replace(" ", "T"));
    return Number.isNaN(data.getTime()) ? valor : data.toLocaleString("pt-BR");
}

function mensagemErro(erro) {
    return erro instanceof TypeError
        ? "Não foi possível acessar o PHP. Inicie o Apache no XAMPP e abra a página pelo localhost."
        : erro.message;
}

function limparFormulario() {
    campoId.value = "";
    campoNome.value = "";
    campoInicio.value = "";
    campoTermino.value = "";
    campoSecao.value = "";
    campoLocal.value = "";
    campoDescricao.value = "";
    document.getElementById("situacao").value = "programada";
    botaoAdicionar.textContent = "Adicionar";
    botaoCancelar.classList.add("hidden");
}

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
