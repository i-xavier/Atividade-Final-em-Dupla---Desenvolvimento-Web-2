// Importa a classe do modelo individual de item
import ItemCarrinho from "./itemCarrinho.js";

class Carrinho{

    constructor(itens = [], status = true){
        this.itens = itens;
        this.status = status;
        this.subtotal = "0.00";
    }

    adicionarItem(item){
        const foundItem = this.itens.find(i => i.produto.id === item.id);
        if(foundItem){
            itemExistente.aumentarQuantidade();
        } else{
            const livro = new ItemCarrinho(item, 1);
            this.itens.push(livro);
        }
    }

    calcularSubtotal(){


    }

    /*calcularTaxaEntrega(){

    }*/

    calcularTotal(){

    }

    getItensCarrinho(){
        return this.itens;
    }

    /*getQuantidadeTotalItens(){

    }*/
}

export default Carrinho;