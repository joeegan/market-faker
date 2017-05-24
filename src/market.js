/*
 * An observable market with optional history
 */
const { Observable } = require('rxjs/Rx')
const History = require('./history')

export const Market = spec => {

  return Observable
    .of(getInitialSnapshot(spec))
    .do(data => tick(data))
    .do(data => history.update(data))
    .concatMap(json => {
      return Observable
        .of(json)
        .delay(random(500, 1000))
    })
    .repeat()

}

const getInitialSnapshot = ({ name, opening, history }) => {
  const buy = getBuy(opening, getPriceMovement());
  const sell = getSell(opening, getPriceMovement());
  return {
    name: name,
    buy: buy,
    sell: sell,
    high: buy,
    low: sell,
    change: getChange(opening, buy),
    history: new History(history),
    changePercentage: getChangePercentage(opening, buy),
  }
}

const tick = data => {
  const { buy, sell, high, low } = data
  return Object.assign({}, data, {
    priceMovement: random(0.1, 5) / 2,
    midPrice: +(either(buy, sell)),
    high: Math.max(high, buy),
    low: Math.min(low, sell),
  })
}

// Finance utils
const getBuy = (midPrice, priceDistance) =>
  +(midPrice + priceDistance).toFixed(2)

const getSell = (midPrice, priceDistance) =>
  +(midPrice - priceDistance).toFixed(2)

const getChange = (opening, buy) =>
  +(opening - buy).toFixed(2)

const getChangePercentage = (opening, change) =>
  getPercentage(opening, change)

const getPriceMovement = () =>
  random(0.1, 5) / 2


// Utils
const pad = n => {
  const str = n.toString()
  return str.length > 1 ? str : '0' + str
}

const getUpdateTime = () => {
  var d = new Date()
  return [
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  ].map(pad)
   .join(':')
}

const random = (min, max, decimalPoints = 1) => +(Math.random() * (max - min) + min).toFixed(decimalPoints)

const either = (a, b) => +random(0, 1, 0) ? a : b

const getPercentage = (total, value) => +(value / total * 100).toFixed(2)

const priceFormat = n => +n.toFixed(2)
