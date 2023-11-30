function removerFornecedor() {
    var a = document.querySelector("#deletar")

    var confirmarAcao = confirm("Deseja deletar o fornecedor?")

    if (confirmarAcao == false) {
        a.href = "/fornecedores"
    }
}