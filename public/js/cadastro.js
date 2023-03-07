const form = document.getElementById('form')
const tipo = document.getElementById('tipo')
const modelo = document.getElementById('modelo')
const fornecedor = document.getElementById('fornecedor')
// const cnpj = document.getElementById('cnpj')
const data = document.getElementById('data')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    checarCampos()
})

function checarCampos() {
    const tipoValue = tipo.value
    const modeloValue = modelo.value
    const fornecedorValue = fornecedor.value
    // const cnpjValue = cnpj.value
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

    if (fornecedorValue === '') {
        erroDeCampo(fornecedor, 'Preencha esse campo')
    }
    else {
        campoPreenchido(fornecedor)
    }

    // if (cnpjValue === '') {
    //     erroDeCampo(cnpj, 'Preencha esse campo')
    // } else if(cnpjValue.length != 14) {
    //     erroDeCampo(cnpj, 'O campo cnpj deve conter 14 digítos')
    // }
    // else {
    //     campoPreenchido(cnpj)
    // }

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
