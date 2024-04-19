function removerItem() {
    var a = document.querySelector("#deletar")

    var confirmarAcao = confirm("Deseja deletar o item?")

    if (confirmarAcao == false) {
        a.href = "/patrimonio"
    }
}