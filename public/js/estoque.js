function removerEstoque() {
    var a = document.querySelector("#deletar")

    var confirmarAcao = confirm("Deseja deletar o estoque?")

    if (confirmarAcao === false) {
        a.href = "/estoque"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    function validarFormulario(event) {
        event.preventDefault();

        const localizacao = document.getElementById('localizacao').value;
        const quantidade = document.getElementById('quantidade').value;
        if (!localizacao) {
            showMessage('error', 'O campo localizacao é obrigatório.');
            return;
        }

        if (!quantidade) {
            showMessage('error', 'O campo quantidade é obrigatório.');
            return;
        }


        form.submit();

        showMessage('success');
    }

    form.addEventListener('submit', validarFormulario);

    function showMessage(tipo, mensagem) {
        if (tipo === 'success') {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Operação realizada com sucesso!",
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
        } else if (tipo === 'error') {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Ocorreu um erro nessa operação!",
                text: mensagem,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }
    }
});
