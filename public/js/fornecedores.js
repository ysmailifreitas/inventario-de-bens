function removerFornecedor() {
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
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;

        if (!nome) {
            showMessage('error', 'O campo Nome é obrigatório.');
            return;
        }

        if (!telefone) {
            showMessage('error', 'O campo Telefone é obrigatório.');
            return;
        }

        if (!email) {
            showMessage('error', 'O campo Email é obrigatório.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('error', 'Por favor, insira um email válido.');
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
