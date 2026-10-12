document.addEventListener("DOMContentLoaded", () => {
    carregarAvisos();
});

document.getElementById('avisoPublicar').addEventListener('click', () => {
    const titulo = document.getElementById('avisoTitulo').value //dados digitados no formulário
    const mensagem = document.getElementById('avisoMensagem').value
    const dataP = document.getElementById('avisoData').value

    if (!titulo || !mensagem || !dataP) { //verifica campos vazios
        alert("Por favor, preencha todos os campos!");
        return;
    }

    criaAviso(titulo, mensagem, dataP); //quando clica em Publicar envia os dados para a função criaAviso

    document.getElementById('avisoTitulo').value = ""; //limpa os campos do formulário após enviar
    document.getElementById('avisoMensagem').value = "";
    document.getElementById('avisoData').value = "";
});

function criaAviso(titulo, mensagem, data) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")) || []; //pega a lista salva do localStorage ou se não existir cria um array vazia
    listaAvisos.push({ titulo: titulo, mensagem: mensagem, data: data }); //cria um objeto com os dados e adiciona à listaAvisos
    localStorage.setItem("listaAvisos", JSON.stringify(listaAvisos)); //salva no localStorage, JSON.stringify converte o array para string pois o localStorage armazena somente string
    exibirAviso(titulo, mensagem, data, listaAvisos.length - 1); //chama a função para exibir o arquivo criado na tela
                                                                // o lenght -1 representa o índice do aviso
};

function exibirAviso(titulo, mensagem, data, indice) {
    const dataFormatada = data.split("-").reverse().join("/"); //converte a data
    const cardsAvisos = document.getElementById('cardsAvisos'); //pega a área que vai receber os cards

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
    `; //acrescenta um novo card de aviso
}

function carregarAvisos() { //mostra todos os avisos salvos no localStorage
    document.getElementById('cardsAvisos').innerHTML = ""; //apaga todos os cards para não duplicar

    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")) || []; //pega a a string do localStorage e convertr para array novamente

    for (let i = 0; i < listaAvisos.length; i++) { //percorre todos os avisos
        exibirAviso(listaAvisos[i].titulo, listaAvisos[i].mensagem, listaAvisos[i].data, i); //pega os dados da listaAvisos e chama a função para exibir eles na tela
    }
};

function excluirAviso(indice) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")); //recupera a lista do localStorage
    listaAvisos.splice(indice, 1); //remove o elemento do indice
    localStorage.setItem("listaAvisos", JSON.stringify(listaAvisos)); //salva novamente
    carregarAvisos(); //atualiza a página com todos os cards que restaram no localStorage
};

function alterarAviso(indice) { //carrega os dados nos campos de alteração
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")); //recupera a lista do localStorage
    document.getElementById('avisoTitulo').value = listaAvisos[indice].titulo;
    document.getElementById('avisoMensagem').value = listaAvisos[indice].mensagem;
    document.getElementById('avisoData').value = listaAvisos[indice].data; //coloca todos os valores armazenados nos campos do formulário
    document.getElementById('areaSalvarAviso').innerHTML = //adiciona o botão de Salvar alteração
        `<button type="button" onclick="salvarAlteracao(${indice})"
        class="rounded-xl bg-amber-500 px-6 py-2.5 text-white font-medium hover:bg-amber-600">
        Salvar alteração
    </button>`;
    document.getElementById('avisoPublicar').classList.add('hidden'); //oculta o botão de Publicar
};

function salvarAlteracao(indice) {
    const listaAvisos = JSON.parse(localStorage.getItem("listaAvisos")); //recupera a lista do localStorage

    const titulo = document.getElementById('avisoTitulo').value; //lê os novos dados preenchidos nos campos de alteraçao
    const mensagem = document.getElementById('avisoMensagem').value;
    const data = document.getElementById('avisoData').value;

    if (!titulo || !mensagem || !data) {
        alert("Por favor, preencha todos os campos!"); //verifica campos vazios na alteração
        return;
    }

    listaAvisos[indice].titulo = titulo; //altera os dados na listaAvisos
    listaAvisos[indice].mensagem = mensagem;
    listaAvisos[indice].data = data;

    localStorage.setItem("listaAvisos", JSON.stringify(listaAvisos)); //salva as alterações no localStorage
    carregarAvisos(); //atualiza a página com os novos dados salvos no localStorage

    document.getElementById('formAviso').reset(); //limpa o formulário depois da alteração
    document.getElementById('areaSalvarAviso').innerHTML = ""; //remove o botão Salvar alteração
    document.getElementById('avisoPublicar').classList.remove('hidden'); //adiciona novamente o botão Publicar
};