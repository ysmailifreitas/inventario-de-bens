function removerPatrimonio() {
    var a = document.querySelector("#deletar")

    var confirmarAcao = confirm("Deseja deletar o fornecedor?")

    if (confirmarAcao === false) {
        a.href = "/fornecedores"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    function validarFormulario(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const vida_util = document.getElementById('vida_util').value;
        const data_aquisicao = document.getElementById('data_aquisicao').value;

        if (!nome) {
            showMessage('error', 'O campo Nome é obrigatório.');
            return;
        }

        if (!vida_util) {
            showMessage('error', 'O campo vida_util é obrigatório.');
            return;
        }

        if (!data_aquisicao) {
            showMessage('error', 'O campo data_aquisicao é obrigatório.');
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
