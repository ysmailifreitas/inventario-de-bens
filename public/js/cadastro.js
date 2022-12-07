        const form = document.getElementById('form')
        const tipo = document.getElementById('tipo')
        const modelo = document.getElementById('modelo')
        const codigo = document.getElementById('codigo')
        const fornecedor = document.getElementById('fornecedor')
        const CNPJ = document.getElementById('CNPJ')
        const data = document.getElementById('data')


    function checarCampos() {
        const tipoValue = tipo.value
        const modeloValue = modelo.value
        const codigoValue = codigo.value
        const fornecedorValue = fornecedor.value
        const CNPJValue = CNPJ.value
        const dataValue = data.value

        if (tipoValue === '') {
            erroDeCampo(tipo)
        }
    }

    function erroDeCampo(input) {
        const formControl = input.parentElement;

        formControl.className = 'block error'
    }
