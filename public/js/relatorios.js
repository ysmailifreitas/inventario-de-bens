document.querySelector("#gera-relatorio").addEventListener("click", async function(event) {
    const tipoRelatorioSelect = document.querySelector("#tipo-relatorio");
    const value = tipoRelatorioSelect.options[tipoRelatorioSelect.selectedIndex].value;

    if (value === "0") {
        alert("Selecione uma opção");
        return;
    }
    try {
        const response = await fetch("/data-relatorio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ value: value })
        });

        if (!response.ok) {
            throw new Error("Erro ao gerar relatório");
        }

        setTimeout(function () {
         window.location.reload();
        }, 1000);

    } catch (error) {
        console.error("Erro ao gerar relatório", error)
        alert("Erro ao gerar relatório");
    }
});