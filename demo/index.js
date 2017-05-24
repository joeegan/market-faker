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

const headings = ['', 'Sell', 'Buy', 'High', 'Low', 'Change (pts)', 'Change %']
const header = '<thead><tr>' + headings.reduce((str, name, i) => {
  return str += `<th>${name}</th>`
}, '') + '</tr></thead>'

const rows = '<tbody>' + markets.reduce((str, market, i) => {
  return str += `<tr id=market${i}></tr>`
}, '') + '</tbody>'

window.onload = () => {

  document.querySelector('table').innerHTML = header + rows;

  markets.forEach((m, i) => {

    m.subscribe(market => {

      const {
        name,
        buy,
        sell,
        high,
        low,
        change,
        changePercentage,
      } = market

      const [previousBuy] = market.history.buy
      const hasRisen = previousBuy < buy
      const hasDropped = previousBuy > buy
      const lastMidTicks = market.history.midPrice
      // console.log(lastMidTicks)

      render([
        `${name} ${sparkline(lastMidTicks)}`,
        formatPrice(buy, hasRisen, hasDropped),
        formatPrice(sell, hasRisen, hasDropped),
        high.toFixed(2),
        low.toFixed(2),
        formatChange(change),
        formatChange(changePercentage),
      ], i)

    })
  });

}

const span = (color, content) => `<span class=${color}>${content}</span>`;

const render = (data, rowIndex) => {
  data.index = rowIndex;
  document.querySelector(`#market${rowIndex}`).innerHTML = data.reduce((str, d, i) => {
    return str += `<td>${d}</td>`;
  }, '');
}

const formatPrice = (num, hasRisen, hasDropped) => {
  let color = 'white'
  if (hasRisen) {
    color = 'red'
  }
  if (hasDropped) {
    color = 'blue'
  }
  return span(color, num.toFixed(2));
}

const formatChange = num => {
  const color = (num > 0) ? 'blue' : 'red';
  return span(color, num.toFixed(2));
}
