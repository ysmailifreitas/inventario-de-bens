const { calcularAnosDecorridos, calcularValorTotal,
    calcularDepreciacaoAnual, calcularTaxaDepreciacaoAnual,
    calcularTaxaUtilizacao, calcularValorLiquido, calcularROI } = require('../services/calculardorItensService');

test('Calcula os anos corridos', () => {
    expect(Math.round(calcularAnosDecorridos('05/10/2022'))).toBe(2);
    expect(Math.round(calcularAnosDecorridos('05/03/2022'))).not.toBe(3);
});

test('Calcula o valor total', () => {
    expect(calcularValorTotal(10, 100)).toBe(1000);
    expect(calcularValorTotal(10, 100)).not.toBe(1100);
});

// test('Calcula a depreciação anual', () => {

// })

test('Calcula a taxa de depreciação anual', () => {
    expect(calcularTaxaDepreciacaoAnual(5, 20)).toBe(25)
    expect(calcularTaxaDepreciacaoAnual(5, 20)).not.toBe(30)
    // Calculo caso o valor de compra for 0
    expect(calcularTaxaDepreciacaoAnual(5, 0)).toBe(0)
    expect(calcularTaxaDepreciacaoAnual(5, 0)).not.toBe(1)
})

test('Calcula a taxa de utilização', () => {
    expect(calcularTaxaUtilizacao(5, 20)).toBe(25);
    expect(calcularTaxaUtilizacao(5, 20)).not.toBe(27);
    // Calculo caso a quantidade total seja igual a 0
    expect(calcularTaxaUtilizacao(5, 0)).toBe(0);
    expect(calcularTaxaUtilizacao(5, 0)).not.toBe(!0);
})

test('Calcular o valor líquido', () => {
    expect(calcularValorLiquido(2000, 80, 2)).toBe(1840)
    expect(calcularValorLiquido(2000, 80, 2)).not.toBe(1900)
})

test('Calcula o ROI', () => {
    expect(calcularROI(2000, 2600, 2)).toBe(15)
    expect(calcularROI(2000, 2600, 2)).not.toBe(17)
    // Calculo caso o valor compra seja igual a 0
    expect(calcularROI(0, 400, 3)).toBe(0)
    expect(calcularROI(0, 400, 3)).not.toBe(!0)
})




