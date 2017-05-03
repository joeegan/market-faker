const readline = require('readline')
const Table = require('cli-table')
const colors = require('colors')
const Market = require('../src/market')
const sparkline = require('sparkline')

const table = new Table({
  head: ['', 'Sell', 'Buy', 'High', 'Low', 'Change (pts)', 'Change %'],
  style: { head: ['white'] },
  colWidths: [30, 10, 10, 10, 10, 15, 12],
})

const markets = [
  new Market('Foobar PLC', 1271.0),
  new Market('Bazqux PLC', 4500.0)
]

setInterval(() => {
  const data = markets.map(market => {
    const {
      name,
      buy,
      sell,
      high,
      low,
      change,
      changePercentage,
      lastMidTicks,
    } = market

    return [
      `${name} ${sparkline(lastMidTicks.slice(lastMidTicks.length - 18, lastMidTicks.length-1))}`,
      formatPrice(buy, true, market),
      formatPrice(sell, true, market),
      high.toFixed(2),
      low.toFixed(2),
      formatChange(change),
      formatChange(changePercentage),
    ]
  })
  table.splice(0)
  table.push(...data)
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, 1)
  process.stdout.write(`${table.toString()}`)
}, 100)

const formatPrice = (num, color, market) => {
  if (color && market.hasRisen) {
    return num.toFixed(2).red
  }
  if (color && market.hasDropped) {
    return num.toFixed(2).blue
  }
  return num.toFixed(2).white
}

const formatChange = num => {
  return num > 0 ? num.toFixed(2).blue : num.toFixed(2).red
}
