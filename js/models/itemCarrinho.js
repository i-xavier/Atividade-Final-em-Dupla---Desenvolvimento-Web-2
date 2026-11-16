// ITEMCARRINHO.JS (modelo)
// Representa UMA linha do carrinho: um livro (produto) e quantas unidades dele.

class ItemCarrinho {
    // produto: o objeto do livro (vem de livros.js) | quantidade: número de unidades
    constructor(produto, quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    // Botão "+": soma 1 unidade
    aumentarQuantidade() {
        this.quantidade++;
    }

    // Botão "−": tira 1 unidade, mas nunca deixa passar de 1
    // (para tirar o item de vez, existe o botão de remover)
    diminuirQuantidade() {
        if (this.quantidade <= 1) {
            return;
        }

        this.quantidade--;
    }
}

export default ItemCarrinho;