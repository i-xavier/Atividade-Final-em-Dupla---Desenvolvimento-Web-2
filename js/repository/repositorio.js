// REPOSITORIO.JS
// "Banco de dados" do site: guarda a lista de livros e o carrinho,
// e é o único lugar que lê/escreve o carrinho no localStorage.
// As páginas não mexem no localStorage direto, elas pedem para este arquivo.

// Importa as classes de modelo de dados do carrinho
import ItemCarrinho from "../models/itemCarrinho.js";
import Carrinho from "../models/carrinho.js";
import { livrosDefault } from "../data/livros.js";


class Repositorio {
    constructor() {
        // Inicializa o catálogo de produtos buscando do localStorage
        // (na prática, usa a lista fixa do arquivo livros.js)
        this.livros = livrosDefault;

        // Reconstrói a instância do carrinho a partir dos dados gravados.
        // O localStorage só guarda texto/objetos simples, então os itens
        // precisam ser transformados de novo em ItemCarrinho (para voltarem
        // a ter os métodos aumentarQuantidade/diminuirQuantidade).
        const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho"));
        if (carrinhoSalvo && carrinhoSalvo.itens) {
            const itensReconstruidos = carrinhoSalvo.itens.map(
                i => new ItemCarrinho(i.produto, i.quantidade)
            );
            this.carrinho = new Carrinho(itensReconstruidos, carrinhoSalvo.status);
        } else {
            // Primeira visita (ou nada salvo): começa com carrinho vazio
            this.carrinho = new Carrinho([], true);
        }
    }

    // Procura um livro pelo id. Devolve o livro ou null se não existir.
    buscarLivro(id) {
        return this.livros.find(p => p.id === parseInt(id)) || null;
    }


    // Devolve o objeto carrinho inteiro
    getCarrinho() {
        return this.carrinho;
    }

    // Adiciona um livro ao carrinho e já salva no localStorage
    abrirCarrinho(livro) {
        this.carrinho.adicionarItem(livro);
        this.salvarCarrinho();
    }

    // Devolve a lista de itens do carrinho
    getItensCarrinho() {
        return this.carrinho.getItensCarrinho();
    }

    // Devolve o valor total do carrinho (soma de preço x quantidade)
    getSubtotal() {
        return this.carrinho.calcularSubtotal();
    }

    // Remove o item que está na posição "indice" da lista.
    // Devolve true se removeu, false se a posição não existe.
    apagarItemCarrinho(indice) {
        if (indice >= 0 && indice < this.carrinho.itens.length) {
            this.carrinho.itens.splice(indice, 1);
            this.salvarCarrinho();
            return true;
        }
        return false;
    }

    // Esvazia o carrinho e salva
    limparCarrinhoAberto() {
        this.carrinho.itens = [];
        this.salvarCarrinho();
    }

    // Grava o carrinho no localStorage (é isso que faz ele "persistir" ao recarregar)
    salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    }

    // Soma das quantidades de todos os itens (usado no contador do menu)
    getQuantidadeTotalItens() {
        return this.carrinho.getTotalItens();
    }

    // Reservado para o cupom de desconto (funcionalidade extra ainda não finalizada)
    cupomAceito(){
        this.carrinho.cupom = true;
    }
}

// Cria UMA única instância e exporta. Todas as páginas importam o mesmo "bd",
// então todas enxergam o mesmo carrinho.
const bd = new Repositorio();
export default bd;