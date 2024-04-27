function calcularAnosDecorridos(dataAquisicao) {
    const dataAquisicaoDate = new Date(dataAquisicao);
    const dataAtual = new Date();
    const anosDecorridos =
        (dataAtual - dataAquisicaoDate) / (365 * 24 * 60 * 60 * 1000);
    return anosDecorridos;
}

function calcularValorTotal(quantidade, precoUnitario) {
    return quantidade * precoUnitario;
}

function calcularDepreciacaoAnual(dataAquisicao) {
    const dataAquisicaoDate = new Date(dataAquisicao);
    const dataAtual = new Date();
    const anosDecorridos =
        (dataAtual - dataAquisicaoDate) / (365 * 24 * 60 * 60 * 1000);

    if (isNaN(anosDecorridos) || anosDecorridos <= 0) {
        return 0;
    }

    return 1 / anosDecorridos;
}

function calcularTaxaDepreciacaoAnual(depreciacaoAnual, valorCompra) {
    if (valorCompra === 0) {
        return 0;
    }
    if (depreciacaoAnual === null || isNaN(depreciacaoAnual)) {
        throw new Error("Erro ao calcular a depreciação anual do patrimônio");
    }
    const taxaDepreciacaoAnual = (depreciacaoAnual / valorCompra) * 100;
    return taxaDepreciacaoAnual;
}

function calcularTaxaUtilizacao(quantidadeEmUso, quantidadeTotal) {
    if (quantidadeTotal === 0) {
        return 0;
    }
    const taxaUtilizacao = (quantidadeEmUso / quantidadeTotal) * 100;
    return isNaN(taxaUtilizacao) ? 0 : taxaUtilizacao;
}

function calcularValorLiquido(valorCompra, depreciacaoAnual, anosDecorridos) {
    const valorLiquido = valorCompra - depreciacaoAnual * anosDecorridos;
    return valorLiquido;
}

function calcularROI(valorCompra, valorVenda, anosDecorridos) {
    if (valorCompra === 0) {
        return 0;
    }
    const roi =
        (((valorVenda - valorCompra) / valorCompra) * 100) / anosDecorridos;
    return roi;
}

module.exports = {
    calcularAnosDecorridos,
    calcularValorTotal,
    calcularDepreciacaoAnual,
    calcularTaxaDepreciacaoAnual,
    calcularTaxaUtilizacao,
    calcularValorLiquido,
    calcularROI
}