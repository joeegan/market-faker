const readline = require('readline')
const Table = require('cli-table')
const colors = require('colors')
const sparkline = require('sparkline')
const Market = require('../src/market')

const table = new Table({
  head: ['', 'Sell', 'Buy', 'High', 'Low', 'Change (pts)', 'Change %'],
  style: { head: ['white'] },
  colWidths: [30, 10, 10, 10, 10, 15, 12],
})

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

const tableData = []

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
  table.splice(rowIndex, 1, data)
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, 1)
  process.stdout.write(`${table.toString()}`)
}

const formatPrice = (num, hasRisen, hasDropped) => {
  const { white, red, blue } = num.toFixed(2)
  if (hasRisen) {
    return red
  }
  if (hasDropped) {
    return blue
  }
  return white
}

const formatChange = num => {
  const { red, blue } = num.toFixed(2)
  return num > 0 ? blue : red
}
