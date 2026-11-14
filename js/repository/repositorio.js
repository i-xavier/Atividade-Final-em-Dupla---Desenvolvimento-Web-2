// Importa as classes de modelo de dados do carrinho
import ItemCarrinho from "../models/itemCarrinho.js";
import Carrinho from "../models/carrinho.js";


class Repositorio{
    constructor() {
        // Inicializa o catálogo de produtos buscando do localStorage
        this.produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        // Reconstrói a instância do carrinho a partir dos dados gravados
        const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho"));
        if (carrinhoSalvo && carrinhoSalvo.itens) {
            const itensReconstruidos = carrinhoSalvo.itens.map(
                i => new ItemCarrinho(i.produto, i.quantidade)
            );
            this.carrinho = new Carrinho(itensReconstruidos, carrinhoSalvo.status);
        } else {
            this.carrinho = new Carrinho([], true);
        }
    }

    getProdutos(){

    }

    buscarProduto(id){

    }

    getCarrinho(){

    }

    abrirCarrinho(){

    }

    getItensCarrinho(){

    }

    getSubtotal(){

    }

    apagarItemCarrinho(indice){

    }

    limparCarrinhoAberto(){

    }

    salvarCarrinho(){
        localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    }

    getQuantidadeTotalItens(){

    }
}

export default Repositorio;