import Repositorio from "../repository/repositorio.js";

const bd = new Repositorio();
const id = Number(new URLSearchParams(window.location.search).get("id"));
const item = bd.buscarLivro(id);
const livroDados = document.getElementById("livro-dados");
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


document.addEventListener("DOMContentLoaded", (e) => {
    renderizarLivro();
})

function renderizarLivro() {
    livroCapa.src = item.imagem;
    livroCapa.alt = item.alt;
    livroCat.innerText = item.categoria;
    livroTitulo.innerText = item.titulo;
    livroAutor.innerText = item.autor;
    livroPreco.innerText = item.preco;
    livroSinopse.innerText = item.sinopse;
    livroEditora.innerText = item.editora;
    livroAno.innerText = item.ano;
    livroPaginas.innerText = item.paginas;
    livroDados.hidden = false;
}

btnAddCarrinho.addEventListener("click", (e) =>{
    bd.abrirCarrinho(item);
})