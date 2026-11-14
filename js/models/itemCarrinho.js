// Classe de modelo que armazena a referência do produto e sua quantidade
class ItemCarrinho {
    constructor(produto, quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    // Incrementa em uma unidade a quantidade do item
    aumentarQuantidade() {
        this.quantidade++;
    }

    // Decrementa a quantidade em uma unidade sem permitir valores menores que 1
    diminuirQuantidade() {
        if (this.quantidade <= 1) {
            return;
        }

        this.quantidade--;
    }
}

// Exporta o modelo para reutilização nos módulos da aplicação
export default ItemCarrinho;