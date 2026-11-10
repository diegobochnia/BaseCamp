let avisosCarregados = [];

document.addEventListener("DOMContentLoaded", () => {
    const botaoPublicar = document.getElementById("avisoPublicar");

    botaoPublicar.addEventListener("click", async (evento) => {
        evento.preventDefault();
        console.log("Clique em Publicar recebido");

        try {
            await criaAviso();
        } catch (erro) {
            console.error("Erro ao publicar:", erro);
            alert("Falha ao publicar. Confira o Console.");
        }
    });
    carregarAvisos();
    carregarAutores();

    document.getElementById("avisoVisibilidade")
        .addEventListener("change", atualizarCampoSecao);

    carregarSecoesAviso();
});


function atualizarCampoSecao() {
    const visibilidade = document.getElementById("avisoVisibilidade").value;
    const campo = document.getElementById("campoAvisoSecao");
    const seletor = document.getElementById("avisoSecao");
    const porSecao = visibilidade === "secao";

    campo.hidden = !porSecao;
    seletor.disabled = !porSecao;
    seletor.required = porSecao;
}

async function carregarSecoesAviso() {
    const seletor = document.getElementById("avisoSecao");

    try {
        const resposta = await fetch(
            "../assets/php/secoes/listar_secoes.php?situacao=todas"
        );
        const retorno = await resposta.json();

        if (!resposta.ok || retorno.status !== "ok") {
            throw new Error(retorno.mensagem || "Falha ao carregar seções.");
        }

        for (const secao of retorno.data) {
            seletor.add(new Option(secao.nome, secao.id_secao));
        }
    } catch (erro) {
        seletor.options[0].textContent = "Erro ao carregar seções";
        console.error("Erro ao carregar seções dos avisos:", erro);
    }
}

async function criaAviso() {
    const titulo = document.getElementById('avisoTitulo').value //dados digitados no formulário
    const mensagem = document.getElementById('avisoMensagem').value
    const dataP = document.getElementById('avisoData').value
    const autor = document.getElementById("avisoAutor").value;
    const visibilidade = document.getElementById("avisoVisibilidade").value; 

    if (!titulo || !mensagem || !dataP || !autor || !visibilidade) { //verifica campos vazios
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("mensagem", mensagem);
    fd.append("data", dataP);
    fd.append("autor", autor);
    fd.append("visibilidade", visibilidade);

    if (visibilidade === "secao") {
        const idSecao = document.getElementById("avisoSecao").value;

        if (!idSecao) {
            alert("Selecione uma seção.");
            return;
        }

        fd.append("id_secao", idSecao);
    }

    const resposta = await fetch("../assets/php/avisos/cadastrar_avisos.php", {
        method: "POST",
        body: fd
    });

    const retorno = await resposta.json();

    if (resposta.ok && retorno.status === "ok") {
        alert("Sucesso: " + retorno.mensagem);
        document.getElementById("formAviso").reset();
        await carregarAvisos();
    } else {
        alert("Erro: " + retorno.mensagem);
    }
}

async function carregarAutores() {
    const select = document.getElementById("avisoAutor");

    try {
        const resposta = await fetch("../assets/php/avisos/listar_autores.php");
        const retorno = await resposta.json();

        if (!resposta.ok || retorno.status !== "ok") {
            throw new Error(retorno.mensagem || "Falha ao consultar autores.");
        }

        for (const autor of retorno.data) {
            select.add(new Option(autor.nome, autor.id_usuario));
        }

        if (retorno.data.length === 0) {
            select.options[0].textContent = "Nenhum autor ativo cadastrado";
        }
    } catch (erro) {
        select.options[0].textContent = "Erro ao carregar autores";
        console.error(erro);
    }
}

function exibirAviso(titulo, mensagem, data, idAviso) {
    const dataFormatada = data.split("-").reverse().join("/");
    const cardsAvisos = document.getElementById("cardsAvisos");

    const card = document.createElement("div");
    card.className = "border border-black rounded-2xl p-4 bg-white shadow-sm space-y-2 mb-4";

    card.innerHTML = `
        <h3 class="font-bold text-lg text-green-800"></h3>
        <p class="text-gray-600"></p>
        <span class="text-xs text-gray-400 block"></span>
        <button type="button" class="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700">
            Excluir
        </button>
        <button type="button" class="ml-2 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600">
            Alterar
        </button>
    `;

    card.querySelector("h3").textContent = titulo;
    card.querySelector("p").textContent = mensagem;
    card.querySelector("span").textContent = `Publicado em: ${dataFormatada}`;

    const [botaoExcluir, botaoAlterar] = card.querySelectorAll("button");
    botaoExcluir.addEventListener("click", () => excluirAviso(idAviso));
    botaoAlterar.addEventListener("click", () => alterarAviso(idAviso));

    cardsAvisos.appendChild(card);
}

async function carregarAvisos() {
    try {
        const resposta = await fetch(
            "../assets/php/avisos/listar_avisos.php"
        );

        const retorno = await resposta.json();

        console.log(retorno);
        if (retorno.status !== "ok") {
            alert(retorno.mensagem);
            return;
        }

        avisosCarregados = retorno.data;

        document.getElementById("cardsAvisos").innerHTML = "";

        for (const aviso of avisosCarregados) {
            exibirAviso(
                aviso.titulo,
                aviso.mensagem,
                aviso.publicado_em.split(" ")[0],
                aviso.id_aviso
            );
        }
    } catch (erro) {
        console.error("Erro ao carregar avisos:", erro);
    }
}

async function excluirAviso(idAviso) {
    const retorno = await fetch("../assets/php/avisos/excluir_avisos.php?id="+idAviso);
    const resposta = await retorno.json();
    if (resposta.status !== "ok") {
        alert(resposta.mensagem || "Não foi possível excluir o aviso.");
        return;
    }

    await carregarAvisos();
};

async function alterarAviso(idAviso) { //Preenche os campos do formulário com os dados do Banco
    const retorno = await fetch("../assets/php/avisos/listar_avisos.php?id="+idAviso);
    const resposta = await retorno.json();
         if (resposta.status !== "ok" || !resposta.data[0]) {
            alert(resposta.mensagem || "Aviso não encontrado.");
            return;
        }
    
        const registro = resposta.data[0];
        document.getElementById("avisoTitulo").value = registro.titulo;
        document.getElementById("avisoMensagem").value = registro.mensagem;
        document.getElementById("avisoData").value = registro.publicado_em.split(" ")[0];
        document.getElementById("avisoAutor").value = registro.autor;
        document.getElementById("avisoVisibilidade").value = registro.visibilidade;
        document.getElementById("avisoSecao").value = registro.id_secao ?? "";
        atualizarCampoSecao();
        document.getElementById('areaSalvarAviso').innerHTML = //adiciona o botão de Salvar alteração
            `<button type="button" onclick="salvarAlteracao(${idAviso})"
            class="rounded-xl bg-amber-500 px-6 py-2.5 text-white font-medium hover:bg-amber-600">
            Salvar alteração
        </button>`;
        document.getElementById('avisoPublicar').classList.add('hidden'); //oculta o botão de Publicar
}

async function salvarAlteracao(idAviso) {
    var titulo = document.getElementById('avisoTitulo').value; //lê os novos dados preenchidos nos campos de alteraçao
    var mensagem = document.getElementById('avisoMensagem').value;
    var data = document.getElementById('avisoData').value;
    var autor = document.getElementById('avisoAutor').value;
    var visibilidade =  document.getElementById('avisoVisibilidade').value;

    if (!titulo || !mensagem || !data || !autor || ! visibilidade) {
        alert("Por favor, preencha todos os campos!"); //verifica campos vazios na alteração
        return;
    }

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("mensagem", mensagem);
    fd.append("data", data);
    fd.append("autor", autor);
    fd.append("visibilidade", visibilidade);

    if (visibilidade === "secao") {
        const idSecao = document.getElementById("avisoSecao").value;

        if (!idSecao) {
            alert("Selecione uma seção.");
            return;
        }

        fd.append("id_secao", idSecao);
    }
    

    const retorno = await fetch("../assets/php/avisos/alterar_avisos.php?id=" + idAviso,
        {
          method: 'POST',
          body: fd  
        });

    const resposta = await retorno.json();

    if(resposta.status === "ok"){
        alert("SUCESSO: " + resposta.mensagem);
        document.getElementById('formAviso').reset(); //limpa o formulário depois da alteração
        document.getElementById('areaSalvarAviso').innerHTML = ""; //remove o botão Salvar alteração
        document.getElementById('avisoPublicar').classList.remove('hidden'); //adiciona novamente o botão Publicar
        await carregarAvisos();
    }else{
        alert("ERRO: " + resposta.mensagem);
    }
};