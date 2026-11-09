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
});


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
    const dataFormatada = data.split("-").reverse().join("/"); //converte a data
    const cardsAvisos = document.getElementById('cardsAvisos'); //pega a área que vai receber os cards

    cardsAvisos.innerHTML += ` 
        <div class="border border-black rounded-2xl p-4 bg-white shadow-sm space-y-2 mb-4">
            <h3 class="font-bold text-lg text-green-800">${titulo}</h3>
            <p class="text-gray-600">${mensagem}</p>
            <span class="text-xs text-gray-400 block">Publicado em: ${dataFormatada}</span>
            <button type="button" onclick="excluirAviso(${idAviso})"
                class="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700">
                Excluir
            </button>
            <button type="button" onclick="alterarAviso(${idAviso})"
                class="ml-2 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600">
                Alterar
            </button>
        </div>
    `; //acrescenta um novo card de aviso
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