function gerarRelatorio() {
    const tipoRelatorioSelect = document.querySelector("#tipo-relatorio");
    const value = tipoRelatorioSelect.options[tipoRelatorioSelect.selectedIndex].value;

    if(value == 0 || value == " "){
        alert("Selecione uma opção")
        return
    } else if(value == "pat"){
        window.location.href = "/gerar-pdf-pat";
    } else if(value == "forn"){
        window.location.href = "/gerar-pdf-for";
    } else if(value == "loc"){
      window.location.href = "/gerar-pdf-loc";
    }
}
