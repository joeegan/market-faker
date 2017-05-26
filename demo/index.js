const sparkline = require('sparkline')
const Market = require('../src/market').Market

const tickHistory = {
  buy: 1,
  sell: 1,
  midPrice: 18,
}

const markets = [
  Market({
    name: 'Foobar PLC',
    opening: 1271.0,
    history: tickHistory,
  }),
  Market({
    name: 'Bazqux PLC',
    opening: 4500.0,
    history: tickHistory,
  }),
]

const getColumns = (data, i=0) => {
  let bullish, bearish;
  if (data) {
    const [previousBuy] = data.history.buy
    bullish = previousBuy < data.buy
    bearish = previousBuy > data.buy
  }
  return [
    {
      key: 'name',
      formatter: () => data.name,
    },
    {
      key: 'history',
      formatter: () => sparkline(data.history.midPrice)
    },
    {
      key: 'sell',
      heading: 'Sell',
      formatter: () => formatPrice(data.sell, bullish, bearish),
    },
    {
      key: 'buy',
      heading: 'Buy',
      formatter: () => formatPrice(data.buy, bullish, bearish),
    },
    {
      key: 'high',
      heading: 'High',
      formatter: () => data.high.toFixed(2),
    },
    {
      key: 'low',
      heading: 'Low',
      formatter: () => data.low.toFixed(2),
    },
    {
      key: 'change',
      heading: 'Change (pts)',
      formatter: () => formatChange(data.change),
    },
    {
      key: 'changePercentage',
      heading: 'Change %',
      formatter: () => formatChange(data.changePercentage),
    },
  ].map(col => ({
    ...col,
    dom: document.querySelector(`#market${i} .${col.key}`),
  }))
}

const header = '<thead><tr>' + getColumns().reduce((str, { heading='' }, i) => {
  return str += `<th>${heading}</th>`
}, '') + '</tr></thead>'

const rows = '<tbody>' + markets.reduce((str, market, i) => {
  return str += `<tr id=market${i}></tr>`
}, '') + '</tbody>'


window.onload = () => {

  document.querySelector('table').innerHTML = header + rows;

  markets.forEach((m, i) => {

    buildRow(
      getColumns(m.snapshot, i)
        .reduce((o, col) => ({
          ...o,
          [col.key]: col.formatter()
        }), {}),
      i
    )

    m.subscribe(d => {
      updateRow(d, i)
    })

  })

}

const buildRow = (data, rowIndex) => {
  let str = ''
  for (let d in data) {
    str += `<td class=${d}>${data[d]}</td>`
  }
  // TODO return str so innerHTML happens once
  document.querySelector(`#market${rowIndex}`).innerHTML = str;
}

const updateRow = (data, i) => {
  for (let key in data) {
    const col = getColumns(data, i)
                  .find(d => d.key === key)
    if (col) {
      col.dom.innerHTML = col.formatter()
    }
  }
}

const colorSpan = (color, content) =>
  `<span class=${color}>${content}</span>`;

const formatPrice = (num, bullish, bearish) => {
  let color = 'white'
  if (bullish) {
    color = 'red'
  } else if (bearish) {
    color = 'blue'
  }
  return colorSpan(
    color,
    num.toFixed(2)
  )
}

const formatChange = num => {
  const color = (num > 0) ? 'blue' : 'red'
  return colorSpan(color, num.toFixed(2))
}
