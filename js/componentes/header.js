import bd from "../repository/repositorio.js";

const html = document.documentElement;
const modoEscuro = document.getElementById('theme-toggle');
const qtdCarrinho = document.getElementById('qtd-carrinho');
let tema = localStorage.getItem("theme") || 'light';

document.addEventListener("DOMContentLoaded", ()=>{
    detectarTema();
});

modoEscuro.addEventListener('click', () => {
    tema = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', tema);
    detectarTema();
});

function detectarTema(){
    html.setAttribute('data-theme', tema);
}

export function atualizarContador(){
    qtdCarrinho.textContent = bd.getQuantidadeTotalItens();  
}