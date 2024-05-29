document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const buttonId = document.querySelector('form button');

    form.addEventListener('submit', validarFormulario);

    function validarFormulario(event) {
        event.preventDefault();

        switch (buttonId) {
            case 'entrada-btn':
        //         const selectFor = document.getElementById('select-for').value;
                const nome = document.getElementById('nome').value;
        //         const quantidade = document.getElementById('quantidade').value;
        //         const localizacao = document.getElementById('localizacaor').value;
        //         const tipo = document.getElementById('tipo').value;
        //         const data_aquisicao = document.getElementById('data_aquisicao').value;
        //         const preco_unitario = document.getElementById('preco_unitario').value;
        //         const estadoConservacao = document.getElementById('estadoConservacao').value;
        //         const vida_util = document.getElementById('vida_util').value;
        //
                if (!nome) {
                    showMessage('error', 'O campo Nome é obrigatório.');
                    return;
                }
        //
        //         if (!vida_util) {
        //             showMessage('error', 'O campo vida_util é obrigatório.');
        //             return;
        //         }
        //
        //         if (!data_aquisicao) {
        //             showMessage('error', 'O campo data_aquisicao é obrigatório.');
        //             return;
        //         }
        //     case 'saida-btn':
        //         const nome = document.getElementById('nome').value;
        //         const vida_util = document.getElementById('vida_util').value;
        //         const data_aquisicao = document.getElementById('data_aquisicao').value;
        //
        //         if (!nome) {
        //             showMessage('error', 'O campo Nome é obrigatório.');
        //             return;
        //         }
        //
        //         if (!vida_util) {
        //             showMessage('error', 'O campo vida_util é obrigatório.');
        //             return;
        //         }
        //
        //         if (!data_aquisicao) {
        //             showMessage('error', 'O campo data_aquisicao é obrigatório.');
        //             return;
        //         }
        }


        form.submit();

        showMessage('success');
    }

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

function showMessage(tipo) {
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