// Procura na pagina o botao de adicionar e espera o usuario clicar nele.
document.getElementById('btn_add').addEventListener("click", () => {
    // Busca cada campo pelo seu id e le o texto que o usuario digitou.
    let nome = document.getElementById("Nome").value;
    let data = document.getElementById("Data").value;
    let horario = document.getElementById("Horario").value;
    let secao = document.getElementById("secçao").value;
    let descricao = document.getElementById("descrição").value;

    let tamanhoDescricao = descricao.length;
    alert("O tamanho da descrição é: " + tamanhoDescricao + " caracteres.");

    // Verifica todos os campos antes de guardar a atividade.
    // trim() remove espacos das pontas, e some() retorna true se achar um campo vazio.
    if ([nome, data, horario, secao, descricao].some(campo => !campo.trim())) {
        // Avisa o usuario e encerra esta funcao sem salvar nada.
        alert("Preencha todos os campos antes de adicionar a atividade.");
        return;
    }

    // Le a lista salva no navegador e converte o texto JSON em uma lista JavaScript.
    // Se ainda nao existir uma lista salva, usa uma lista vazia como valor inicial.
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];

    // Cria um objeto com os dados preenchidos e acrescenta esse objeto ao final da lista.
    lista.push({nome: nome, data: data, horario: horario, secao: secao, descricao: descricao });

    // Converte a lista de volta para texto JSON, pois o localStorage guarda texto.
    localStorage.setItem("atividades", JSON.stringify(lista));

    // Atualiza os itens mostrados na pagina para incluir a nova atividade.
    listar();
});

// Esta funcao monta novamente a lista de atividades exibida na pagina.
function listar(){
    // Recupera as atividades salvas; se nao houver nenhuma, comeca com uma lista vazia.
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];

    // Encontra o elemento HTML que contem os itens da lista.
    const container = document.getElementById("listaatividades");

    // Apaga o conteudo antigo para evitar que os mesmos itens aparecam duplicados.
    container.innerHTML = "";

    // Quando nao ha atividades, mostra uma mensagem e nao tenta percorrer a lista.
    if (lista.length === 0) {
        container.innerHTML = `
            <li class="rounded-xl border border-dashed border-green-200 bg-green-50 px-4 py-5 text-sm text-slate-600">
                Nenhuma atividade cadastrada.
            </li>`;
        // return encerra a funcao, pois nao ha atividades para mostrar abaixo.
        return;
    }

    // Percorre cada atividade; atividade contem os dados e indice indica sua posicao.
    lista.forEach((atividade, indice) => {
        // Acrescenta ao HTML um item com os dados e os botoes para editar ou excluir.
        // Os valores entre ${...} sao substituidos pelos dados da atividade atual.
        container.innerHTML += `
        <li class="flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div class="min-w-0 flex-1 space-y-1">
                <p class="font-semibold text-green-900">${atividade.nome}</p>
                <p class="text-sm text-slate-600">${atividade.data} • ${atividade.horario} • ${atividade.secao}</p>
                <p class="max-w-full text-sm text-slate-700 whitespace-pre-line [overflow-wrap:anywhere]">${atividade.descricao}</p>
            </div>
            <div class="flex shrink-0 gap-2">
                <button type="button" onclick="carregar(${indice})" class="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-green-800 ring-1 ring-green-200 transition hover:bg-green-100">Editar</button>
                <button type="button" onclick="excluir(${indice})" class="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 ring-1 ring-red-200 transition hover:bg-red-100">Excluir</button>
            </div>
        </li>`;
    });
}

// Exclui da lista a atividade que esta na posicao recebida em indice.
function excluir(indice){
    // Le os dados atuais do armazenamento do navegador.
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];

    // Remove um item a partir da posicao indicada.
    lista.splice(indice,1);

    // Salva a lista atualizada e redesenha os itens na pagina.
    localStorage.setItem("atividades", JSON.stringify(lista));  
    listar();  
}

// Coloca os dados da atividade escolhida de volta nos campos do formulario.
function carregar(indice){
    // Recupera a lista para localizar a atividade pela sua posicao.
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];

    // Preenche cada campo do formulario com o valor que ja estava salvo.
    document.getElementById("Nome").value = lista[indice].nome;
    document.getElementById("Data").value = lista[indice].data;
    document.getElementById("Horario").value = lista[indice].horario;
    document.getElementById("secçao").value = lista[indice].secao;
    document.getElementById("descrição").value = lista[indice].descricao;

    // Cria o botao de confirmacao e associa a ele a posicao da atividade editada.
    document.getElementById("alterar").innerHTML = `<button type="button" onclick="alterar(${indice})" class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600">Alterar</button>`;
}

// Salva no lugar da atividade escolhida os novos valores do formulario.
function alterar(indice){
    // Le a lista salva para modificar o item correto.
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];

    // Copia os valores atuais dos campos para a atividade selecionada.
    lista[indice].nome = document.getElementById("Nome").value;
    lista[indice].data = document.getElementById("Data").value;
    lista[indice].horario = document.getElementById("Horario").value;
    lista[indice].secao = document.getElementById("secçao").value;
    lista[indice].descricao = document.getElementById("descrição").value;

    // Remove o botao temporario de alteracao depois de concluir a edicao.
    document.getElementById("alterar").innerHTML = "";

    // Guarda a lista atualizada e mostra os novos dados na pagina.
    localStorage.setItem("atividades", JSON.stringify(lista));  
    listar();
}

// Ao clicar no botao de atualizar, redesenha a lista com os dados salvos.
document.getElementById('btn_upd').addEventListener("click", () => {
    listar();
});