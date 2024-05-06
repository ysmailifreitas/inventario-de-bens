function itValorTotal(){
    var valorUnitario = parseFloat(document.getElementById("precoUnitario").value)
    var quantidadeItens = parseInt(document.getElementById("quantidade").value)
    var valorTotal = valorUnitario * quantidadeItens

    document.getElementById("precoUnitario").addEventListener("input", itValorTotal);
    document.getElementById("quantidade").addEventListener("input", itValorTotal);

    document.getElementById("valorCompra").value = valorTotal.toFixed(2);
}





