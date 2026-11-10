const URL_BASE = "../assets/php/integrantes/";
const formulario = document.getElementById("formIntegrante");
const campoId = document.getElementById("id_integrante");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const nascimentoInput = document.getElementById("nascimento");
const telefoneInput = document.getElementById("telefone");
const secoesSelect = document.getElementById("secoes");
const addButton = document.getElementById("add-integrante");
const botaoCancelar = document.getElementById("cancelarEdicao");
const tableBody = document.getElementById("integrantes-table-body");
const resultado = document.getElementById("Resultado");

addButton.addEventListener("click", salvar);
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

function mostrarErro(erro) {
    resultado.textContent = erro instanceof TypeError
        ? "Não foi possível acessar o PHP. Inicie o Apache no XAMPP e abra a página pelo localhost."
        : erro.message;
}

async function carregarSecoes() {
    try {
        const json = await solicitarJson("../assets/php/secoes/listar_secoes.php?situacao=ativa");
        const valorSelecionado = secoesSelect.value;
        secoesSelect.replaceChildren(new Option("Selecione uma seção", ""));
        json.data.forEach(secao => secoesSelect.add(new Option(secao.nome, secao.id_secao)));
        secoesSelect.value = valorSelecionado;
    } catch (erro) {
        console.error("Erro ao carregar seções:", erro);
        mostrarErro(erro);
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

async function listar() {
    try {
        const json = await solicitarJson(`${URL_BASE}listar_integrantes.php?situacao=ativo`);
        tableBody.replaceChildren();

        if (json.data.length === 0) {
            const linhaVazia = document.createElement("tr");
            const celula = document.createElement("td");
            celula.colSpan = 5;
            celula.className = "px-4 py-6 text-center text-zinc-400";
            celula.textContent = "Nenhum integrante cadastrado.";
            linhaVazia.appendChild(celula);
            tableBody.appendChild(linhaVazia);
            return;
        }

        json.data.forEach(integrante => {
            const linha = document.createElement("tr");
            linha.className = "hover:bg-zinc-50 transition";

            [integrante.nome, integrante.data_nascimento, integrante.telefone || ""].forEach(valor => {
                const celula = document.createElement("td");
                celula.className = "px-4 py-2";
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const celulaSecao = document.createElement("td");
            celulaSecao.className = "px-4 py-2";
            const etiqueta = document.createElement("span");
            etiqueta.className = "bg-green-100 text-green-900 text-xs font-medium px-2 py-1 rounded-full capitalize";
            etiqueta.textContent = integrante.secao;
            celulaSecao.appendChild(etiqueta);
            linha.appendChild(celulaSecao);

            const celulaAcoes = document.createElement("td");
            celulaAcoes.className = "px-4 py-2 space-x-3";
            celulaAcoes.append(
                criarBotao("Editar", "text-green-900 hover:underline cursor-pointer", () => carregar(integrante)),
                criarBotao("Excluir", "text-red-700 hover:underline cursor-pointer", () => excluir(integrante.id_integrante))
            );
            linha.appendChild(celulaAcoes);

            tableBody.appendChild(linha);
        });
    } catch (erro) {
        console.error("Erro ao listar integrantes:", erro);
        mostrarErro(erro);
    }
}

async function salvar() {
    if (!nomeInput.value.trim() || !emailInput.value.trim() || !nascimentoInput.value || !secoesSelect.value) {
        resultado.textContent = "Preencha nome, e-mail, data de nascimento e seção.";
        return;
    }

    const dados = new FormData(formulario);
    const endpoint = campoId.value ? "alterar_integrantes.php" : "cadastrar_integrantes.php";

    try {
        const json = await solicitarJson(`${URL_BASE}${endpoint}`, { method: "POST", body: dados });
        limparFormulario();
        await listar();
        resultado.textContent = json.mensagem;
    } catch (erro) {
        console.error("Erro ao salvar integrante:", erro);
        resultado.textContent = erro.message;
    }
}

function carregar(integrante) {
    campoId.value = integrante.id_integrante;
    nomeInput.value = integrante.nome;
    emailInput.value = integrante.email;
    emailInput.readOnly = true; // o e-mail não é alterado pela edição
    nascimentoInput.value = integrante.data_nascimento;
    telefoneInput.value = integrante.telefone || "";
    secoesSelect.value = integrante.id_secao;
    addButton.value = "Salvar";
    botaoCancelar.classList.remove("hidden");
    resultado.textContent = "Editando integrante.";
}

async function excluir(idIntegrante) {
    if (!confirm("Excluir este integrante permanentemente do banco de dados? A operação pode ser recusada se houver registros vinculados.")) {
        return;
    }

    const dados = new FormData();
    dados.append("id_integrante", idIntegrante);

    try {
        const json = await solicitarJson(`${URL_BASE}excluir_integrantes.php`, { method: "POST", body: dados });
        if (campoId.value === String(idIntegrante)) limparFormulario();
        await listar();
        resultado.textContent = json.mensagem;
    } catch (erro) {
        console.error("Erro ao excluir integrante:", erro);
        resultado.textContent = erro.message;
    }
}

function cancelarEdicao() {
    limparFormulario();
    resultado.textContent = "";
}

function limparFormulario() {
    campoId.value = "";
    nomeInput.value = "";
    emailInput.value = "";
    emailInput.readOnly = false;
    nascimentoInput.value = "";
    telefoneInput.value = "";
    secoesSelect.value = "";
    addButton.value = "Adicionar";
    botaoCancelar.classList.add("hidden");
}

carregarSecoes();
listar();
