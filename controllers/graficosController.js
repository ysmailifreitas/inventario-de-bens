const { Sequelize, Model, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const Itens = require("../models/Patrimonio");

//Gráfico de Quantidade de Itens
exports.getDadosGrafico = async (req, res) => {
const seisDias = new Date();
seisDias.setDate(seisDias.getDate() - 6)
const cincoDias = new Date();
cincoDias.setDate(cincoDias.getDate() - 5)
const quatroDias = new Date();
quatroDias.setDate(quatroDias.getDate() - 4)
const tresDias = new Date();
tresDias.setDate(tresDias.getDate() - 3)
const doisDias = new Date();
doisDias.setDate(doisDias.getDate() - 2)
const umDia = new Date();
umDia.setDate(umDia.getDate() - 1)

const contagemHoje = await Itens.count();

const haUmDia = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: umDia,
    },
  },
});

const haDoisDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: doisDias,
    },
  },
});

const haTresDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: tresDias,
    },
  },
});

const haQuatroDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: quatroDias,
    },
  },
});

const haCincoDias = await Itens.count({
  where: {
    createdAt: {
      [Op.lt]: cincoDias,
    },
  },
});

const haSeisDias = await Itens.count({
  where: {
    createdAt: {
    [Op.lt]: seisDias,
    },
  },
});

const graficoItens = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
        label: 'Estoque do Inventário',
        data: [haSeisDias, haCincoDias, haQuatroDias,
          haTresDias, haDoisDias, haUmDia, contagemHoje],
        borderWidth: 1
      }]
    };

    res.json(graficoItens)
};

//Gráfico de Valor de Itens

exports.getGraficoValor = async (req, res) => {
const seisDias = new Date();
seisDias.setDate(seisDias.getDate() - 6)
const cincoDias = new Date();
cincoDias.setDate(cincoDias.getDate() - 5)
const quatroDias = new Date();
quatroDias.setDate(quatroDias.getDate() - 4)
const tresDias = new Date();
tresDias.setDate(tresDias.getDate() - 3)
const doisDias = new Date();
doisDias.setDate(doisDias.getDate() - 2)
const umDia = new Date();
umDia.setDate(umDia.getDate() - 1)

const contagemHoje = await Itens.sum('pat_valor');

const haUmDia = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: umDia,
    },
  },
});

const haDoisDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: doisDias,
    },
  },
});

const haTresDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: tresDias,
    },
  },
});

const haQuatroDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: quatroDias,
    },
  },
});

const haCincoDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: cincoDias,
    },
  },
});

const haSeisDias = await Itens.sum('pat_valor', {
  where: {
    createdAt: {
      [Op.lt]: seisDias,
    },
  },
});

const valorGrafico = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
        label: 'Valor do Inventário',
        data: [haSeisDias, haCincoDias, haQuatroDias,
          haTresDias, haDoisDias, haUmDia, contagemHoje],
        borderWidth: 1
      }]
    };

    res.json(valorGrafico)
};