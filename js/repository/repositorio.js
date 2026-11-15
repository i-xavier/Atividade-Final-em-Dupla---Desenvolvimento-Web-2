// Importa as classes de modelo de dados do carrinho
import ItemCarrinho from "../models/itemCarrinho.js";
import Carrinho from "../models/carrinho.js";
import { livrosDefault } from "../data/livros.js";


class Repositorio {
    constructor() {
        // Inicializa o catálogo de produtos buscando do localStorage
        this.livros = livrosDefault;

        /*this.itens = JSON.parse(localStorage.getItem("itens")) || [];*/

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

    /*getItens() {
        return this.itens;
    }*/

    /*
    buscarItem(id) {
        return this.itens.find(p => p.id === parseInt(id)) || null;
    }*/

    buscarLivro(id) {
        return this.livros.find(p => p.id === parseInt(id)) || null;
    }


    getCarrinho() {
        return this.carrinho;
    }

    abrirCarrinho(livro) {
        this.carrinho.adicionarItem(livro);
        this.salvarCarrinho();
    }

    getItensCarrinho() {
        return this.carrinho.getItensCarrinho();
    }

    getSubtotal() {
        return this.carrinho.calcularSubtotal();
    }

    apagarItemCarrinho(indice) {
        if (indice >= 0 && indice < this.carrinho.itens.length) {
            this.carrinho.itens.splice(indice, 1);
            this.salvarCarrinho();
            return true;
        }
        return false;
    }

    limparCarrinhoAberto() {
        this.carrinho.itens = [];
        this.salvarCarrinho();
    }

    salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    }

    getQuantidadeTotalItens() {
        return this.carrinho.getTotalItens();
    }

    cupomAceito(){
        this.carrinho.cupom = true;
    }
}

const bd = new Repositorio();
export default bd;