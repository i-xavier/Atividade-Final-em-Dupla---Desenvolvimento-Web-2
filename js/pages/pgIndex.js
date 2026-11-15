import { livrosDefault } from "../data/livros.js";
import { atualizarContador } from "../componentes/header.js";

const vitrine = document.getElementById("lista-destaques");


const livros = livrosDefault;

const livrosDestaque = livros.filter( livro => livro.destaque === true);

document.addEventListener("DOMContentLoaded", (e) =>{
    renderizarVitrine();
    atualizarContador();
})

function renderizarVitrine(){

    livrosDestaque.forEach(livro =>{

        const div = document.createElement("div");
        div.id = livro.id;
        div.classList.add("cardDestaque");

        const spanImg = document.createElement("span");

        const img = document.createElement("img");
        img.classList.add("imgDestaque")
        img.src = livro.imagem;
        img.alt = livro.alt
        spanImg.appendChild(img);

        const spanAutor = document.createElement("span");
        spanAutor.classList.add("autorCardDestaque");
        spanAutor.textContent = livro.autor;

        const spanTitulo = document.createElement("span");
        spanTitulo.classList.add("tituloCardDestaque");
        spanTitulo.textContent = livro.titulo;

        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoCardDestaque");
        spanPreco.textContent = `R$ ${parseFloat(livro.preco).toFixed(2)}`;

        const verDetalhes = document.createElement("a");
        verDetalhes.classList.add("btnVerDetalhes")
        verDetalhes.href = `livro.html?id=${livro.id}`
        verDetalhes.textContent = "Ver Detalhes";

        div.append(spanImg, spanTitulo, spanAutor, spanPreco, verDetalhes);
        vitrine.appendChild(div);
    })
}

/*
Seria melhor reaproveitar essa função em vez de escrever uma outra que é basicamente a mesma coisa.

import { livrosDefault } from "../data/livros.js";
import { renderizarVitrine } from "./pgCatalogo.js";

const vitrine = document.getElementById("lista-destaques");


const livros = livrosDefault.filter( livro => livro.destaque === true);

document.addEventListener("DOMContentLoaded", (e) =>{
    renderizarVitrine(vitrine, livros);
}) */