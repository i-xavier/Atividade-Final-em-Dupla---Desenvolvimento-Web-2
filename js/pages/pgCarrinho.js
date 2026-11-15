import Repositorio from "../repository/repositorio.js";
import { livrosDefault } from "../data/livros.js";

const bd = new Repositorio();
const carrinho = document.getElementById("itens-carrinho");
const subtotal = document.getElementById("subtotal");

document.addEventListener("DOMContentLoaded", (e) => {
    renderizarCarrinho();
})

function renderizarCarrinho() {

    limparListaCarrinho();

    const itensCarrinho = bd.getItensCarrinho();

    itensCarrinho.forEach((item, index) => {

        const div = document.createElement("div");
        div.id = item.produto.id;
        div.classList.add("cardCarrinho");

        const spanImg = document.createElement("span");

        const img = document.createElement("img");
        //img.classList.add("imgDestaque")
        img.src = item.produto.imagem;
        img.alt = item.produto.alt
        spanImg.appendChild(img);

        const spanCat = document.createElement("span");
        spanCat.classList.add("categoriaCardCarrinho");
        spanCat.textContent = item.produto.categoria;

        const spanTitulo = document.createElement("span");
        spanTitulo.classList.add("tituloCardCarrinho");
        spanTitulo.textContent = item.produto.titulo;

        const spanAutor = document.createElement("span");
        spanAutor.classList.add("autorCardCarrinho");
        spanAutor.textContent = item.produto.autor;

        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoCardCarrinho");
        spanPreco.textContent = `R$ ${parseFloat(item.produto.preco).toFixed(2)}`;

        const spanQtdControl = document.createElement("div");

        const spanBtnAumentarQtd = document.createElement("button");
        //spanBtnAumentarQtd.textContent = "+";
        spanBtnAumentarQtd.className = "fas fa-plus btn-aumentar";

        spanBtnAumentarQtd.addEventListener("click", (e) => {
            item.aumentarQuantidade();
            bd.salvarCarrinho();
            renderizarCarrinho();
        });

        const spanQtdViewer = document.createElement("span");
        spanQtdViewer.textContent = item.quantidade;

        const spanBtnDiminuirQtd = document.createElement("button");
        spanBtnDiminuirQtd.className = "fas fa-minus btn-diminuir";
        //spanBtnDiminuirQtd.textContent = "-";

        spanBtnDiminuirQtd.addEventListener("click", (e) => {
            item.diminuirQuantidade();
            bd.salvarCarrinho();
            renderizarCarrinho();
        });

        spanQtdControl.append(spanBtnAumentarQtd, spanQtdViewer, spanBtnDiminuirQtd);


        const spanBotoes = document.createElement("span");
        //spanBotoes.classList.add("botoesCard")

        /*const verDetalhes = document.createElement("a");
        //verDetalhes.classList.add("btnVerDetalhes")
        verDetalhes.href = `livro.html?id=${item.produto.id}`
        verDetalhes.textContent = "Ver Detalhes";*/

        const btnDeletarItem = document.createElement("button");
        btnDeletarItem.className = "fas fa-trash-alt btn-excluir";


        btnDeletarItem.addEventListener("click", function () {
            if (confirm("Deseja remover este item do carrinho?")) {
                bd.apagarItemCarrinho(index);
                renderizarCarrinho();
            }
        });

        spanBotoes.append(/*verDetalhes,*/ btnDeletarItem);
        div.append(spanImg, spanCat, spanTitulo, spanAutor, spanQtdControl, spanPreco, spanBotoes);
        carrinho.appendChild(div);
        atualizarSubtotal();
    })
}

function limparListaCarrinho() {
    carrinho.innerHTML = "";
}

function atualizarSubtotal(){

    subtotal.innerText = bd.getSubtotal();

}