// HEADER.JS
// Script compartilhado por todas as páginas (está no <head> de cada HTML).
// Cuida de duas coisas do cabeçalho: o modo claro/escuro e o contador do carrinho.

// Importa o repositório (bd), que guarda o carrinho e sabe quantos itens existem
import bd from "../repository/repositorio.js";

// Referências aos elementos do HTML que vamos usar
const html = document.documentElement;                      // a tag <html> (é nela que o tema é aplicado)
const modoEscuro = document.getElementById('theme-toggle'); // botão "Modo escuro"
const qtdCarrinho = document.getElementById('qtd-carrinho'); // número ao lado de "Carrinho"

// Lê o tema salvo no localStorage; se nunca foi salvo, começa no claro
let tema = localStorage.getItem("theme") || 'light';

// Assim que a página carrega, aplica o tema salvo
document.addEventListener("DOMContentLoaded", ()=>{
    detectarTema();
});

// Ao clicar no botão: alterna entre claro e escuro e salva a escolha
// (assim a preferência continua valendo ao recarregar ou trocar de página)
modoEscuro.addEventListener('click', () => {
    tema = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', tema);
    detectarTema();
});

// Coloca o atributo data-theme na tag <html>.
// O CSS usa [data-theme="dark"] para trocar as cores.
function detectarTema(){
    html.setAttribute('data-theme', tema);
}

// Atualiza o número do carrinho no menu.
// É exportada para que as outras páginas chamem sempre que o carrinho mudar.
export function atualizarContador(){
    qtdCarrinho.textContent = bd.getQuantidadeTotalItens();  
}