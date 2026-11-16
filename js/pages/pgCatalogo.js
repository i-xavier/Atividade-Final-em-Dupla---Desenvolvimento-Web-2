// PGCATALOGO.JS
// Script da página de catálogo (catalogo.html).
// Mostra todos os livros em cards e controla busca, filtro por categoria e ordenação.

import bd from "../repository/repositorio.js";
import { livrosDefault } from "../data/livros.js";
import { atualizarContador } from "../componentes/header.js";


// Elementos do HTML usados na página
const vitrine = document.getElementById("vitrine");                    // onde os cards aparecem
const busca = document.getElementById("search-bar");                   // campo de busca
const btnFiltrosVitrine = document.querySelectorAll(".btn-filtro");    // botões de categoria
const ordenarCatalogo = document.getElementById("ordenar-livros");     // select de ordenação


const livros = livrosDefault;
// Estado atual da tela: qual categoria está escolhida e o que foi digitado na busca
let categoriaAtual = "Todos";
let textoSearchBar = "";

// Quando a página carrega: desenha os cards e atualiza o contador do carrinho
document.addEventListener("DOMContentLoaded", (e) => {
    renderizarVitrine();
    atualizarContador();
})

// BUSCA: a cada letra digitada, guarda o texto e redesenha a lista filtrada
busca.addEventListener("input", (e) => {
    textoSearchBar = busca.value;
    renderizarVitrine();
})

// FILTRO POR CATEGORIA: ao clicar em um botão...
btnFiltrosVitrine.forEach(botao => {
    botao.addEventListener("click", (e) => {
        // ...tira a classe "active" de todos os botões (o CSS destaca o botão ativo)...
        btnFiltrosVitrine.forEach(b => b.classList.remove("active"));
        // ...e coloca "active" só no botão clicado (currentTarget = o botão que recebeu o clique)
        e.currentTarget.classList.add("active"); /*Não sei o que isso ta fazendo, olhar depois */

        // Guarda a categoria do botão (vem do data-id no HTML) e redesenha
        categoriaAtual = e.currentTarget.dataset.id;
        renderizarVitrine();
    });
});

// ORDENAÇÃO: reordena o array conforme a opção escolhida no select
ordenarCatalogo.addEventListener("change", () =>{

    if(ordenarCatalogo.value == 1) {
        // A-Z pelo título (localeCompare respeita acentos do português)
        livros.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));

    } else if(ordenarCatalogo.value == 2){
        // Z-A pelo título
        livros.sort((a, b) => b.titulo.localeCompare(a.titulo, "pt-BR"));

    } else if(ordenarCatalogo.value == 3){
        // Menor preço primeiro
        livros.sort((a, b) => a.preco - b.preco);

    } else if(ordenarCatalogo.value == 4){
        // Maior preço primeiro
        livros.sort((a, b) => b.preco - a.preco);

    } else {
        // "Ordem padrão": volta para a ordem original (pelo id)
        livros.sort((a, b) => a.id - b.id);
    }

    renderizarVitrine();
})

// Apaga os cards atuais e cria de novo, só com os livros que passam
// pela busca e pela categoria escolhidas
function renderizarVitrine() {

    limparListaProdutos();
    const listaLivros = filtrarCatalogo(textoSearchBar, categoriaAtual);

    listaLivros.forEach(livro => {

        // Card (caixa que envolve tudo)
        const div = document.createElement("div");
        div.id = livro.id;
        div.classList.add("cardDestaque");

        // Capa
        const spanImg = document.createElement("span");

        const img = document.createElement("img");
        img.classList.add("imgDestaque")
        img.src = livro.imagem;
        img.alt = livro.alt
        spanImg.appendChild(img);

        // Categoria
        const spanCat = document.createElement("span");
        spanCat.classList.add("categoriaCardDestaque");
        spanCat.textContent = livro.categoria;

        // Título
        const spanTitulo = document.createElement("span");
        spanTitulo.classList.add("tituloCardDestaque");
        spanTitulo.textContent = livro.titulo;

        // Autor
        const spanAutor = document.createElement("span");
        spanAutor.classList.add("autorCardDestaque");
        spanAutor.textContent = livro.autor;

        // Preço
        const spanPreco = document.createElement("span");
        spanPreco.classList.add("precoCardDestaque");
        spanPreco.textContent = `R$ ${parseFloat(livro.preco).toFixed(2)}`;

        // Área dos botões do card
        const spanBotoes = document.createElement("span");
        spanBotoes.classList.add("botoesCard")

        // Link "Ver Detalhes" (leva para livro.html com o id do livro)
        const verDetalhes = document.createElement("a");
        verDetalhes.classList.add("btnVerDetalhes")
        verDetalhes.href = `livro.html?id=${livro.id}`
        verDetalhes.textContent = "Ver Detalhes";

        // Botão de adicionar ao carrinho (o desenho do carrinho vem do FontAwesome)
        const btnCarrinho = document.createElement("button");
        btnCarrinho.classList.add("fas", "fa-shopping-cart", "me-2");
        // Texto para leitores de tela, já que o botão só tem um ícone
        btnCarrinho.setAttribute("aria-label", `Adicionar ${livro.titulo} ao carrinho`);
        btnCarrinho.title = "Adicionar ao carrinho";

        btnCarrinho.addEventListener("click", function () {
            //const item = bd.buscarItens(livro.id);
    
            /*if (item) {
                bd.abrirCarrinho(item);
                alert("deu bom");
            } else {
                console.log("Erro ao adicionar produto");
            }*/

            // Adiciona o livro (e salva no localStorage) e atualiza o número do menu
            bd.abrirCarrinho(livro);
            atualizarContador();
        });

        // Monta o card e joga na vitrine
        spanBotoes.append(verDetalhes, btnCarrinho);
        div.append(spanImg, spanCat, spanTitulo, spanAutor, spanPreco, spanBotoes);
        vitrine.appendChild(div);
    })
}

// Devolve só os livros que combinam com o texto da busca (título ou autor)
// e com a categoria escolhida. São 4 casos possíveis:
//   1) busca + categoria  2) só busca  3) só categoria  4) nenhum filtro
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

// Esvazia a vitrine antes de desenhar de novo
function limparListaProdutos() {
    vitrine.innerHTML = "";
}

// Deixa o texto em minúsculas e sem acentos, para a busca achar
// "ficcao" mesmo que o título seja "Ficção"
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}