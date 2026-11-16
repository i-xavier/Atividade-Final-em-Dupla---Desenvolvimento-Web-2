// PGCARRINHO.JS
// Script da página do carrinho (carrinho.html).
// Mostra os itens, permite mudar quantidade/remover/limpar,
// calcula o total e controla o modal de finalização do pedido.

import bd from "../repository/repositorio.js";
import { atualizarContador } from "../componentes/header.js";



// Elementos do HTML usados na página
const carrinho = document.getElementById("itens-carrinho");        // lista de itens na tela
const subtotal = document.getElementById("subtotal");              // "Total: R$ ..." da página
const totalPedidoEl = document.getElementById("totalPedido");      // total dentro do modal
const itensClosePedido = document.getElementById("itensCarrinho"); // resumo de itens dentro do modal
const form = document.getElementById("formFinalizarPedido");       // o modal é um <form>
const btnLimpar = document.getElementById("limpar-carrinho");
const btnFecharPedido = document.getElementById("fechar-pedido");  // abre o modal
const msg = document.getElementById("msg");                        // mensagem de sucesso/erro do modal

// Quando a página carrega: desenha o carrinho e atualiza o contador do menu
document.addEventListener("DOMContentLoaded", (e) => {
    renderizarCarrinho();
    atualizarContador();
})

// Ao clicar em "Continuar para o Pagamento": o modal abre (pelo Bootstrap)
// e aqui preenchemos o resumo do pedido com os itens atuais
btnFecharPedido.addEventListener("click", () => {
    mostrarMensagem("", true);        // limpa mensagens antigas
    itensClosePedido.innerHTML = "";  // limpa o resumo antigo
    const itens = bd.getItensCarrinho();

    itens.forEach(item => {
        // Uma linha do resumo: nome, quantidade e preço
        const div = document.createElement("div");
        div.classList.add("listaItensPedido");

        // Nome do produto
        const spanNome = document.createElement("span");
        spanNome.classList.add("nomeItemPedido");
        spanNome.textContent = item.produto.titulo;

        // Quantidade do produto
        const spanQtd = document.createElement("span");
        spanQtd.classList.add("qtdItemPedido");
        spanQtd.textContent = `${item.quantidade}x`;

        // Preço total do item no pedido
        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoItemPedido");
        spanPreco.textContent = formatarPreco(item.produto.preco * item.quantidade);

        // Montagem do item no modal
        div.append(spanNome, spanQtd, spanPreco);
        itensClosePedido.appendChild(div);
    });

    atualizarTotalModal();
});

// Mostra o valor total no modal
function atualizarTotalModal() {
    totalPedidoEl.innerText = formatarPreco(bd.getSubtotal());
}

// Redesenha a lista inteira do carrinho. É chamada sempre que algo muda
// (quantidade, remoção, limpeza), então a tela fica sempre igual aos dados.
function renderizarCarrinho() {

    limparListaCarrinho();

    const itensCarrinho = bd.getItensCarrinho();

    // Sem itens, não há o que pagar nem o que esvaziar
    btnFecharPedido.disabled = itensCarrinho.length === 0;
    btnLimpar.disabled = itensCarrinho.length === 0;

    // Carrinho vazio: mostra um aviso com link para o catálogo
    if (itensCarrinho.length === 0) {
        const vazio = document.createElement("p");
        vazio.classList.add("carrinho-vazio");
        vazio.textContent = "Seu carrinho está vazio. ";

        const linkCatalogo = document.createElement("a");
        linkCatalogo.href = "catalogo.html";
        linkCatalogo.textContent = "Ver o catálogo";

        vazio.appendChild(linkCatalogo);
        carrinho.appendChild(vazio);
    }

    // Cria uma linha para cada item (index = posição do item na lista)
    itensCarrinho.forEach((item, index) => {

        const div = document.createElement("div");
        div.id = item.produto.id;
        div.classList.add("item-carrinho");

        // Capa
        const img = document.createElement("img");
        img.src = item.produto.imagem;
        img.alt = item.produto.alt;

        // Bloco com título, autor e preço unitário
        const divInfo = document.createElement("div");
        divInfo.classList.add("item-carrinho-info");

        const spanTitulo = document.createElement("span");
        spanTitulo.classList.add("item-carrinho-titulo");
        spanTitulo.textContent = item.produto.titulo;

        const spanAutor = document.createElement("span");
        spanAutor.classList.add("item-carrinho-autor");
        spanAutor.textContent = item.produto.autor;

        const spanPreco = document.createElement("span");
        spanPreco.classList.add("item-carrinho-preco");
        spanPreco.textContent = `${formatarPreco(item.produto.preco)} cada`;

        divInfo.append(spanTitulo, spanAutor, spanPreco);

        // Bloco com quantidade, subtotal do item e botão de remover
        const divAcoes = document.createElement("div");
        divAcoes.classList.add("item-carrinho-acoes");

        const divQtdControl = document.createElement("div");
        divQtdControl.classList.add("controle-quantidade");

        // Botão "−": desabilitado quando a quantidade é 1 (não existe quantidade 0)
        const btnDiminuirQtd = document.createElement("button");
        btnDiminuirQtd.type = "button";
        btnDiminuirQtd.textContent = "−";
        btnDiminuirQtd.setAttribute("aria-label", `Diminuir a quantidade de ${item.produto.titulo}`);
        btnDiminuirQtd.disabled = item.quantidade <= 1;

        // Ao clicar: diminui, salva no localStorage e redesenha tudo (total incluído)
        btnDiminuirQtd.addEventListener("click", (e) => {
            item.diminuirQuantidade();
            bd.salvarCarrinho();
            renderizarCarrinho();
            atualizarContador();
        });

        // Número da quantidade entre os dois botões
        const spanQtdViewer = document.createElement("span");
        spanQtdViewer.classList.add("quantidade");
        spanQtdViewer.textContent = item.quantidade;

        // Botão "+"
        const btnAumentarQtd = document.createElement("button");
        btnAumentarQtd.type = "button";
        btnAumentarQtd.textContent = "+";
        btnAumentarQtd.setAttribute("aria-label", `Aumentar a quantidade de ${item.produto.titulo}`);

        btnAumentarQtd.addEventListener("click", (e) => {
            item.aumentarQuantidade();
            bd.salvarCarrinho();
            renderizarCarrinho();
            atualizarContador();
        });

        divQtdControl.append(btnDiminuirQtd, spanQtdViewer, btnAumentarQtd);

        // Subtotal deste item (quantidade x preço)
        const spanSubtotalItem = document.createElement("span");
        spanSubtotalItem.classList.add("item-carrinho-subtotal");
        spanSubtotalItem.textContent = formatarPreco(item.quantidade * item.produto.preco);

        // Botão da lixeira (ícone do FontAwesome) para remover o item
        const btnDeletarItem = document.createElement("button");
        btnDeletarItem.type = "button";
        btnDeletarItem.className = "fas fa-trash-alt btn-excluir";
        btnDeletarItem.setAttribute("aria-label", `Remover ${item.produto.titulo} do carrinho`);

        // Pede confirmação antes de remover
        btnDeletarItem.addEventListener("click", function () {
            if (confirm("Deseja remover este item do carrinho?")) {
                bd.apagarItemCarrinho(index);
                renderizarCarrinho();
                atualizarContador();
            }
        });

        // Monta a linha e coloca na lista
        divAcoes.append(divQtdControl, spanSubtotalItem, btnDeletarItem);
        div.append(img, divInfo, divAcoes);
        carrinho.appendChild(div);
    })

    // Fora do forEach: assim o total também é atualizado quando o carrinho fica vazio
    atualizarSubtotal();
}

// Apaga as linhas atuais da lista (antes de desenhar de novo)
function limparListaCarrinho() {
    carrinho.innerHTML = "";
}

// Atualiza o "Total: R$ ..." no topo da página
function atualizarSubtotal(){
    subtotal.innerText = formatarPreco(bd.getSubtotal());
}

// Mostra uma mensagem no modal. sucesso = true usa o estilo verde, false o vermelho
function mostrarMensagem(texto, sucesso) {
    msg.textContent = texto;
    msg.className = sucesso ? "mensagem-form sucesso" : "mensagem-form erro";
}

// Processa a submissão do formulário de finalização da compra
// (o navegador já valida os campos "required" antes de chegar aqui)
form.addEventListener("submit", (e) => {
    e.preventDefault(); // impede a página de recarregar
    if (bd.getItensCarrinho().length === 0) {
        mostrarMensagem("Carrinho vazio!", false);
        return;
    }
    // Compra "feita": esvazia o carrinho (simulação, não há pagamento real)
    bd.limparCarrinhoAberto();

    // Atualiza a tela: lista, total, contador do menu e o resumo do modal
    renderizarCarrinho();
    atualizarContador();
    itensClosePedido.innerHTML = "";
    atualizarTotalModal();
    form.reset();

    mostrarMensagem("Pedido realizado com sucesso!", true);
    //window.location.href = "index.html";
});

// Botão "Limpar Carrinho": pergunta antes de esvaziar tudo
btnLimpar.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
        bd.limparCarrinhoAberto();
        renderizarCarrinho();
        atualizarContador();
    }
});

// Converte um número em dinheiro brasileiro (ex.: 94.9 vira "R$ 94,90")
function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}