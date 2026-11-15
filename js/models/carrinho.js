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
            foundItem.aumentarQuantidade();
        } else{
            const livro = new ItemCarrinho(item, 1);
            this.itens.push(livro);
        }
    }

    calcularSubtotal(){
        let total = 0;
        this.itens.forEach( item => { 
            total += parseInt(item.quantidade) * parseFloat(item.produto.preco);
        })
        this.subtotal = total.toFixed(2);
        return this.subtotal;
    }

    /*calcularDesconto(){

    }*/

    calcularTotal(){
        return this.subtotal;
    }

    getItensCarrinho(){
        return this.itens;
    }

    /*getQuantidadeTotalItens(){

    }*/

    getItensTotalItens(){
        let total  = 0;
        this.itens.forEach(i => {
            total += parseInt(i.quantidade);
        })
        return total;
    }
}

export default Carrinho;