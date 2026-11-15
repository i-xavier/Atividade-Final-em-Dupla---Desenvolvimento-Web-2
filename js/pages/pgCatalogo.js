import Repositorio from "../repository/repositorio.js";
import { livrosDefault } from "../data/livros.js";

const bd = new Repositorio();
const vitrine = document.getElementById("vitrine");
const busca = document.getElementById("search-bar");
const btnFiltrosVitrine = document.querySelectorAll(".btn-filtro");


const livros = livrosDefault;
let categoriaAtual = "Todos";
let textoSearchBar = "";

document.addEventListener("DOMContentLoaded", (e) => {
    renderizarVitrine();
})

busca.addEventListener("input", (e) => {
    textoSearchBar = capitalizarPalavras(busca.value);
    renderizarVitrine();
})

btnFiltrosVitrine.forEach(botao => {
    botao.addEventListener("click", (e) => {
        btnFiltrosVitrine.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active"); /*Não sei o que isso ta fazendo, olhar depois */

        categoriaAtual = e.currentTarget.dataset.id;
        renderizarVitrine();
    });
});

function renderizarVitrine() {

    limparListaProdutos();
    const listaLivros = filtrarCatalogo(textoSearchBar, categoriaAtual);

    listaLivros.forEach(livro => {

        const div = document.createElement("div");
        div.id = livro.id;
        div.classList.add("cardDestaque");

        const spanImg = document.createElement("span");

        const img = document.createElement("img");
        img.classList.add("imgDestaque")
        img.src = livro.imagem;
        img.alt = livro.alt
        spanImg.appendChild(img);

        const spanCat = document.createElement("span");
        spanCat.classList.add("categoriaCardDestaque");
        spanCat.textContent = livro.categoria;

        const spanTitulo = document.createElement("span");
        spanTitulo.classList.add("tituloCardDestaque");
        spanTitulo.textContent = livro.titulo;

        const spanAutor = document.createElement("span");
        spanAutor.classList.add("autorCardDestaque");
        spanAutor.textContent = livro.autor;

        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoCardDestaque");
        spanPreco.textContent = `R$ ${parseFloat(livro.preco).toFixed(2)}`;

        const spanBotoes = document.createElement("span");
        spanBotoes.classList.add("botoesCard")

        const verDetalhes = document.createElement("a");
        verDetalhes.classList.add("btnVerDetalhes")
        verDetalhes.href = `livro.html?id=${livro.id}`
        verDetalhes.textContent = "Ver Detalhes";

        const btnCarrinho = document.createElement("button");
        btnCarrinho.classList.add("fas", "fa-shopping-cart", "me-2");

        btnCarrinho.addEventListener("click", function () {
            //const item = bd.buscarItens(livro.id);
    
            /*if (item) {
                bd.abrirCarrinho(item);
                alert("deu bom");
            } else {
                console.log("Erro ao adicionar produto");
            }*/

            bd.abrirCarrinho(livro);
        });

        spanBotoes.append(verDetalhes, btnCarrinho);
        div.append(spanImg, spanCat, spanTitulo, spanAutor, spanPreco, spanBotoes);
        vitrine.appendChild(div);
    })
}

function filtrarCatalogo(busca, categoria) {

    let listaFiltrada;

    /*O filtro de busca não tá funcionando 100%, talvez por conta da função de capitalização, olhar depois!  */
    if (busca && categoria !== "Todos") {

        listaFiltrada = livros.filter(livro => (livro.titulo.includes(busca) || livro.autor.includes(busca)) && livro.categoria === categoria);

    } else if (busca) {

        listaFiltrada = livros.filter(livro => livro.titulo.includes(busca) || livro.autor.includes(busca));

    } else if (categoria !== "Todos") {

        listaFiltrada = livros.filter(livro => livro.categoria === categoria);

    } else {

        listaFiltrada = livros;
    }

    return listaFiltrada;
}

function limparListaProdutos() {
    vitrine.innerHTML = "";
}

function capitalizarPalavras(texto) {
    return texto.replace(/\b\w/g, letra => letra.toUpperCase());
}