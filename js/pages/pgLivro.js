// PGLIVRO.JS
// Script da página de detalhes (livro.html).
// Descobre qual livro mostrar pelo id na URL (ex.: livro.html?id=4) e preenche a página.

import bd from "../repository/repositorio.js";
import { atualizarContador } from "../componentes/header.js";

// Lê o "id" da URL e transforma em número, depois procura o livro correspondente
// (item vira null se o id não existir)
const id = Number(new URLSearchParams(window.location.search).get("id"));
const item = bd.buscarLivro(id);

// Elementos do HTML que vão receber os dados do livro
const livroDados = document.getElementById("livro-dados");   // bloco com os detalhes
const livroErro = document.getElementById("livro-erro");     // bloco "Livro não encontrado"
const livroCapa = document.getElementById("livro-capa");
const livroCat = document.getElementById("livro-categoria");
const livroTitulo = document.getElementById("livro-titulo");
const livroAutor = document.getElementById("livro-autor");
const livroPreco = document.getElementById("livro-preco");
const livroSinopse = document.getElementById("livro-sinopse");
const livroEditora = document.getElementById("livro-editora");
const livroAno = document.getElementById("livro-ano");
const livroPaginas = document.getElementById("livro-paginas");
const btnAddCarrinho = document.getElementById("btn-adicionar");


// Quando a página carrega: mostra o livro (ou o erro) e atualiza o contador do carrinho
document.addEventListener("DOMContentLoaded", (e) => {
    checarLivro(item);
    atualizarContador();
})

// Escreve cada informação do livro no seu lugar da página
function renderizarLivro() {
    livroCapa.src = item.imagem;
    livroCapa.alt = item.alt;
    livroCat.innerText = item.categoria;
    livroTitulo.innerText = item.titulo;
    livroAutor.innerText = item.autor;
    // Preço no padrão brasileiro: troca o ponto por vírgula (94.90 -> R$ 94,90)
    livroPreco.innerText = `R$ ${Number(item.preco).toFixed(2).replace('.', ',')}`;
    livroSinopse.innerText = item.sinopse;
    livroEditora.innerText = item.editora;
    livroAno.innerText = item.ano;
    livroPaginas.innerText = item.paginas;
    // O bloco começa escondido no HTML (atributo hidden); aqui ele aparece
    livroDados.hidden = false;
}

// Botão "Adicionar ao carrinho": guarda o livro e atualiza o número do menu
btnAddCarrinho.addEventListener("click", (e) =>{
    bd.abrirCarrinho(item);
    atualizarContador();
})

// Decide o que mostrar: se o livro não existe, exibe a mensagem de erro;
// se existe, preenche a página
function checarLivro(item){
    if(item === null){
        livroErro.hidden = false;
        return;
    }

    renderizarLivro();
}