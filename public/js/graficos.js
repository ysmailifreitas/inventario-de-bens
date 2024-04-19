fetch('/dadosGrafico')
.then(response => response.json())
.then(dadosGraficos => {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: dadosGraficos,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});
})

fetch('/graficoValor')
.then(response => response.json())
.then(grafValor => {
  const ctx2 = document.getElementById('myChart2');

  new Chart(ctx2, {
    type: 'line',
    data: grafValor,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});
})