import bd from "../repository/repositorio.js";
import { livrosDefault } from "../data/livros.js";
import { atualizarContador } from "../componentes/header.js";


const vitrine = document.getElementById("vitrine");
const busca = document.getElementById("search-bar");
const btnFiltrosVitrine = document.querySelectorAll(".btn-filtro");
const ordenarCatalogo = document.getElementById("ordenar-livros");


const livros = livrosDefault;
let categoriaAtual = "Todos";
let textoSearchBar = "";

document.addEventListener("DOMContentLoaded", (e) => {
    renderizarVitrine();
    atualizarContador();
})

busca.addEventListener("input", (e) => {
    textoSearchBar = busca.value;
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

ordenarCatalogo.addEventListener("change", () =>{

    if(ordenarCatalogo.value == 1) {
        livros.sort((a, b) => a.titulo.localeCompare(b.titulo));

    } else if(ordenarCatalogo.value == 2){
        livros.sort((a, b) => b.titulo.localeCompare(a.titulo));

    } else if(ordenarCatalogo.value == 3){
        livros.sort((a, b) => a.preco - b.preco);

    } else if(ordenarCatalogo.value == 4){
        livros.sort((a, b) => b.preco - a.preco);
    }

    renderizarVitrine();
})

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
            atualizarContador();
        });

        spanBotoes.append(verDetalhes, btnCarrinho);
        div.append(spanImg, spanCat, spanTitulo, spanAutor, spanPreco, spanBotoes);
        vitrine.appendChild(div);
    })
}

function filtrarCatalogo(busca, categoria) {
    const termo = normalizar(busca.trim());
    let listaFiltrada;

    if (termo && categoria !== "Todos") {
        listaFiltrada = livros.filter(livro =>
            (normalizar(livro.titulo).includes(termo) || normalizar(livro.autor).includes(termo)) &&
            livro.categoria === categoria
        );
    } else if (termo) {
        listaFiltrada = livros.filter(livro =>
            normalizar(livro.titulo).includes(termo) || normalizar(livro.autor).includes(termo)
        );
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

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}