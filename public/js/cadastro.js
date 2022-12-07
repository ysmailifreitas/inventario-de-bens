const form = document.getElementById('form')
const tipo = document.getElementById('tipo')
const modelo = document.getElementById('modelo')
const codigo = document.getElementById('codigo')
const fornecedor = document.getElementById('fornecedor')
const CNPJ = document.getElementById('CNPJ')
const data = document.getElementById('data')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    checarCampos()
})

function checarCampos() {
    const tipoValue = tipo.value
    const modeloValue = modelo.value
    const codigoValue = codigo.value
    const fornecedorValue = fornecedor.value
    const CNPJValue = CNPJ.value
    const dataValue = data.value

    if (tipoValue === '') {
        erroDeCampo(tipo, 'Preencha esse campo')
    }
    else {
        campoPreenchido(tipo)
    }

    if (modeloValue === '') {
        erroDeCampo(modelo, 'Preencha esse campo')
    }
    else {
        campoPreenchido(modelo)
    }

    if (codigoValue === '') {
        erroDeCampo(codigo, 'Preencha esse campo')
    }
    else {
        campoPreenchido(codigo)
    }

    if (fornecedorValue === '') {
        erroDeCampo(fornecedor, 'Preencha esse campo')
    }
    else {
        campoPreenchido(fornecedor)
    }

    if (CNPJValue === '') {
        erroDeCampo(CNPJ, 'Preencha esse campo')
    } else if(CNPJValue.length != 14) {
        erroDeCampo(CNPJ, 'O campo CNPJ deve conter 14 digítos')
    }
    else {
        campoPreenchido(CNPJ)
    }

    if (dataValue === '') {
        erroDeCampo(data, 'Preencha esse campo')
    }
    else {
        campoPreenchido(data)
    }
}

function erroDeCampo(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')

    small.innerText = message
    formControl.className = 'block error'
}

function campoPreenchido(input){
    const formControl = input.parentElement;

    formControl.className = 'block'
}
