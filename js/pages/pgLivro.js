import bd from "../repository/repositorio.js";
import { atualizarContador } from "../componentes/header.js";

const id = Number(new URLSearchParams(window.location.search).get("id"));
const item = bd.buscarLivro(id);
const livroDados = document.getElementById("livro-dados");
const livroErro = document.getElementById("livro-erro");
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
    checarLivro(item);
    atualizarContador();
})

function renderizarLivro() {
    livroCapa.src = item.imagem;
    livroCapa.alt = item.alt;
    livroCat.innerText = item.categoria;
    livroTitulo.innerText = item.titulo;
    livroAutor.innerText = item.autor;
    livroPreco.innerText = `R$ ${Number(item.preco).toFixed(2).replace('.', ',')}`;
    livroSinopse.innerText = item.sinopse;
    livroEditora.innerText = item.editora;
    livroAno.innerText = item.ano;
    livroPaginas.innerText = item.paginas;
    livroDados.hidden = false;
}

btnAddCarrinho.addEventListener("click", (e) =>{
    bd.abrirCarrinho(item);
    atualizarContador();
})

function checarLivro(item){
    if(item === null){
        livroErro.hidden = false;
        return;
    }

    renderizarLivro();
}