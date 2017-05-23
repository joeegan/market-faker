const sparkline = require('sparkline')
const Market = require('../src/market')

const tickHistory = {
  buy: 1,
  sell: 1,
  midPrice: 18,
}

const markets = [
  new Market({
    name: 'Foobar PLC',
    opening: 1271.0,
    history: tickHistory,
  }),
  new Market({
    name: 'Bazqux PLC',
    opening: 4500.0,
    history: tickHistory,
  }),
]

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
})

const render = (data, rowIndex) => {
  console.log('---', data)
}

const formatPrice = (num, hasRisen, hasDropped) => {
  return num
}

const formatChange = num => {
  return num
}
