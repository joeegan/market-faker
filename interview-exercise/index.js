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

// Write solution here...
