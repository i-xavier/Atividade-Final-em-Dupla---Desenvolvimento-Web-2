import bd from "../repository/repositorio.js";
import { livrosDefault } from "../data/livros.js";
import { atualizarContador } from "../componentes/header.js";


const carrinho = document.getElementById("itens-carrinho");
const subtotal = document.getElementById("subtotal");
const totalPedidoEl = document.getElementById("totalPedido");
const itensClosePedido = document.getElementById("itensCarrinho");
const form = document.getElementById("formFinalizarPedido");
const btnLimpar = document.getElementById("limpar-carrinho");
const msg = document.getElementById("msg");

document.addEventListener("DOMContentLoaded", (e) => {
    renderizarCarrinho();
    atualizarContador();
})

document.getElementById("fechar-pedido").addEventListener("click", () => {
    itensClosePedido.innerHTML = "";
    const itens = bd.getItensCarrinho();

    itens.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("listaItensPedido");

        // Nome do produto
        const spanNome = document.createElement("span");
        spanNome.classList.add("nomeItemPedido");
        spanNome.textContent = item.produto.titulo;

        // Quantidade do produto
        const spanQtd = document.createElement("span");
        spanQtd.classList.add("qtdItemPedido");
        spanQtd.textContent = item.quantidade;

        // Preço total do item no pedido
        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoItemPedido");
        spanPreco.textContent = (item.produto.preco * item.quantidade).toFixed(2);

        // Montagem do item no modal
        div.append(spanNome, spanQtd, spanPreco);
        itensClosePedido.appendChild(div);
    });

    atualizarTotalModal();
});

function atualizarTotalModal() {
    //const tipo = selectEntrega ? selectEntrega.value : "";
    totalPedidoEl.innerText = bd.getSubtotal();
}

function renderizarCarrinho() {

    limparListaCarrinho();

    const itensCarrinho = bd.getItensCarrinho();

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

    itensCarrinho.forEach((item, index) => {

        const div = document.createElement("div");
        div.id = item.produto.id;
        div.classList.add("item-carrinho");

        const img = document.createElement("img");
        img.src = item.produto.imagem;
        img.alt = item.produto.alt;

        // Bloco com título, autor e preço unitário
        const divInfo = document.createElement("div");

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

        const btnDiminuirQtd = document.createElement("button");
        btnDiminuirQtd.type = "button";
        btnDiminuirQtd.textContent = "−";
        btnDiminuirQtd.setAttribute("aria-label", `Diminuir a quantidade de ${item.produto.titulo}`);
        btnDiminuirQtd.disabled = item.quantidade <= 1;

        btnDiminuirQtd.addEventListener("click", (e) => {
            item.diminuirQuantidade();
            bd.salvarCarrinho();
            renderizarCarrinho();
            atualizarContador();
        });

        const spanQtdViewer = document.createElement("span");
        spanQtdViewer.classList.add("quantidade");
        spanQtdViewer.textContent = item.quantidade;

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

        const spanSubtotalItem = document.createElement("span");
        spanSubtotalItem.classList.add("item-carrinho-subtotal");
        spanSubtotalItem.textContent = formatarPreco(item.quantidade * item.produto.preco);

        const btnDeletarItem = document.createElement("button");
        btnDeletarItem.type = "button";
        btnDeletarItem.className = "fas fa-trash-alt btn-excluir";
        btnDeletarItem.setAttribute("aria-label", `Remover ${item.produto.titulo} do carrinho`);

        btnDeletarItem.addEventListener("click", function () {
            if (confirm("Deseja remover este item do carrinho?")) {
                bd.apagarItemCarrinho(index);
                renderizarCarrinho();
                atualizarContador();
            }
        });

        divAcoes.append(divQtdControl, spanSubtotalItem, btnDeletarItem);
        div.append(img, divInfo, divAcoes);
        carrinho.appendChild(div);
    })

    // Fora do forEach: assim o total também é atualizado quando o carrinho fica vazio
    atualizarSubtotal();
}

function limparListaCarrinho() {
    carrinho.innerHTML = "";
}

function atualizarSubtotal(){
    subtotal.innerText = bd.getSubtotal();
}

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
} 

// Processa a submissão do formulário de finalização da compra
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (bd.getItensCarrinho().length === 0) {
        msg.innerText = "Carrinho vazio!";
        return;
    }
    msg.innerText = "Pedido realizado com sucesso!";
    bd.limparCarrinhoAberto();
    //window.location.href = "index.html";
});

btnLimpar.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
        bd.limparCarrinhoAberto();
        renderizarCarrinho();
        atualizarContador();
    }
});
