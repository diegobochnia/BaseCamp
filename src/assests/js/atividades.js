document.getElementById('btn_add').addEventListener("click", () => {
    let nome = document.getElementById("Nome").value;
    let data = document.getElementById("Data").value;
    let secao = document.getElementById("secçao").value;
    let descricao = document.getElementById("descrição").value;
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];
    lista.push({nome: nome, data: data, secao: secao, descricao: descricao });
    localStorage.setItem("atividades", JSON.stringify(lista));
    listar();
});

function listar(){
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];
    const container = document.getElementById("listaatividades");
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = `
            <li class="rounded-xl border border-dashed border-green-200 bg-green-50 px-4 py-5 text-sm text-slate-600">
                Nenhuma atividade cadastrada.
            </li>`;
        return;
    }

    lista.forEach((atividade, indice) => {
        container.innerHTML += `
        <li class="flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div class="min-w-0 flex-1 space-y-1">
                <p class="font-semibold text-green-900">${atividade.nome}</p>
                <p class="text-sm text-slate-600">${atividade.data} • ${atividade.secao}</p>
                <p class="max-w-full text-sm text-slate-700 whitespace-pre-line [overflow-wrap:anywhere]">${atividade.descricao}</p>
            </div>
            <div class="flex shrink-0 gap-2">
                <button type="button" onclick="carregar(${indice})" class="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-green-800 ring-1 ring-green-200 transition hover:bg-green-100">Editar</button>
                <button type="button" onclick="excluir(${indice})" class="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 ring-1 ring-red-200 transition hover:bg-red-100">Excluir</button>
            </div>
        </li>`;
    });
}

function excluir(indice){
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];
    lista.splice(indice,1);
    localStorage.setItem("atividades", JSON.stringify(lista));  
    listar();  
}

function carregar(indice){
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];
    document.getElementById("Nome").value = lista[indice].nome;
    document.getElementById("Data").value = lista[indice].data;
    document.getElementById("secçao").value = lista[indice].secao;
    document.getElementById("descrição").value = lista[indice].descricao;
    document.getElementById("alterar").innerHTML = `<button type="button" onclick="alterar(${indice})" class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600">Alterar</button>`;
}

function alterar(indice){
    let lista = JSON.parse(localStorage.getItem("atividades")) || [];
    lista[indice].nome = document.getElementById("Nome").value;
    lista[indice].data = document.getElementById("Data").value;
    lista[indice].secao = document.getElementById("secçao").value;
    lista[indice].descricao = document.getElementById("descrição").value;
    document.getElementById("alterar").innerHTML = "";
    localStorage.setItem("atividades", JSON.stringify(lista));  
    listar();
}

document.getElementById('btn_upd').addEventListener("click", () => {
    listar();
});