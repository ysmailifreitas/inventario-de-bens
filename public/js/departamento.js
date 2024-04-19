function removerEstoque() {
    var a = document.querySelector("#deletar")

    var confirmarAcao = confirm("Deseja deletar a departamento?")

    if (confirmarAcao === false) {
        a.href = "/estoque"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    function validarFormulario(event) {
        event.preventDefault();

        const departamento = document.getElementById('departamento').value;
        const descricao = document.getElementById('descricao').value;
        const responsavel = document.getElementById('responsavel').value;
        if (!departamento) {
            showMessage('error', 'O campo departamento é obrigatório.');
            return;
        }

        if (!descricao) {
            showMessage('error', 'O campo descricao é obrigatório.');
            return;
        }

        if (!responsavel) {
            showMessage('error', 'O campo responsavel é obrigatório.');
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
