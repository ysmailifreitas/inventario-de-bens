//as labels tem que adaptar pro banco de dados

var ctx = document.getElementById('grafico').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Caneta', 'Lapis', 'Piso', 'Carro', 'casa'],
        datasets: [{
            data: [10, 20, 30, 5, 2],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
                'pink'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false
    }
});
const data = {
  labels: ['Caneta', 'Lapis', 'Piso', 'Carro', 'Casa'],
  datasets: [{
    label: 'estoque',
    data: [10, 20, 30, 5, 2],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {}
};

var grafico_2 = new Chart(
  document.getElementById('grafico_2'),
  config
);
