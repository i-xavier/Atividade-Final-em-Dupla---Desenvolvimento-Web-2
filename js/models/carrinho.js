// CARRINHO.JS (modelo)
// Classe que representa o carrinho de compras: guarda os itens
// e sabe fazer as contas (subtotal, total de itens).

import ItemCarrinho from "./itemCarrinho.js";

class Carrinho {

    // itens: lista de ItemCarrinho | status: carrinho aberto (true) ou não
    constructor(itens = [], status = true) {
        this.itens = itens;
        this.status = status;
        this.subtotal = "0.00";
    }

    // Adiciona um livro ao carrinho.
    // Se o livro já está lá, só aumenta a quantidade; senão cria um item novo com quantidade 1.
    adicionarItem(item) {
        const foundItem = this.itens.find(i => i.produto.id === item.id);
        if (foundItem) {
            foundItem.aumentarQuantidade();
        } else {
            const livro = new ItemCarrinho(item, 1);
            this.itens.push(livro);
        }
    }

    // Soma (quantidade x preço) de cada item e devolve o total como texto com 2 casas ("123.45")
    calcularSubtotal() {
        let total = 0;
        this.itens.forEach(item => {
            total += parseInt(item.quantidade) * parseFloat(item.produto.preco);
        })
        this.subtotal = total.toFixed(2);
        return this.subtotal;
    }

    // Total final (por enquanto igual ao subtotal, pois ainda não há desconto)
    calcularTotal() {
        return this.subtotal;
    }

    // Devolve a lista de itens
    getItensCarrinho() {
        return this.itens;
    }
    
    // Conta quantos livros existem no total (ex.: 2 de Duna + 1 de Fundação = 3)
    getTotalItens() {
        let total = 0;
        this.itens.forEach(i => {
            total += parseInt(i.quantidade);
        })
        return total;
    }
}

export default Carrinho;