// PGINDEX.JS
// Script da página inicial (index.html): monta a vitrine "Livros em destaque".

import { livrosDefault } from "../data/livros.js";
import { atualizarContador } from "../componentes/header.js";

// Div do HTML onde os cards serão inseridos
const vitrine = document.getElementById("lista-destaques");


const livros = livrosDefault;

// Pega só os livros marcados com destaque: true em livros.js
const livrosDestaque = livros.filter( livro => livro.destaque === true);

// Quando a página termina de carregar: desenha os cards e atualiza o contador do carrinho
document.addEventListener("DOMContentLoaded", (e) =>{
    renderizarVitrine();
    atualizarContador();
})

// Cria um card para cada livro em destaque e coloca na vitrine
function renderizarVitrine(){

    livrosDestaque.forEach(livro =>{

        // Card (caixa que envolve tudo)
        const div = document.createElement("div");
        div.id = livro.id;
        div.classList.add("cardDestaque");

        // Capa do livro
        const spanImg = document.createElement("span");

        const img = document.createElement("img");
        img.classList.add("imgDestaque")
        img.src = livro.imagem;
        img.alt = livro.alt
        spanImg.appendChild(img);

        // Autor
        const spanAutor = document.createElement("span");
        spanAutor.classList.add("autorCardDestaque");
        spanAutor.textContent = livro.autor;

        // Título
        const spanTitulo = document.createElement("span");
        spanTitulo.classList.add("tituloCardDestaque");
        spanTitulo.textContent = livro.titulo;

        // Preço no formato "R$ 94.90"
        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoCardDestaque");
        spanPreco.textContent = `R$ ${parseFloat(livro.preco).toFixed(2)}`;

        // Link para a página de detalhes (o id vai na URL)
        const verDetalhes = document.createElement("a");
        verDetalhes.classList.add("btnVerDetalhes")
        verDetalhes.href = `livro.html?id=${livro.id}`
        verDetalhes.textContent = "Ver Detalhes";

        // Monta o card na ordem em que aparece na tela e joga na vitrine
        div.append(spanImg, spanTitulo, spanAutor, spanPreco, verDetalhes);
        vitrine.appendChild(div);
    })
}
