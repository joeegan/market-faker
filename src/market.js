/*
 * An observable market with optional history
 */
const { Observable } = require('rxjs/Rx')
const History = require('./history')
import _ from 'lodash';

export const Market = spec => {

  const initialData = getInitialSnapshot(spec)

  return Observable.create(observer => {
    let data;
    observer.next(initialData)
    setInterval(() => {
      const prevData = Object.assign({}, data)
      data = tick(data || initialData)
      observer.next(data)
      data.history.update(data)
    }, _.random(200, 1000))
    //TODO random durations between ticks
  })

}

const getInitialSnapshot = ({ name, opening, history }) => {
  const priceMovement = getPriceMovement()
  const buy = getBuy(opening, priceMovement);
  const sell = getSell(opening, priceMovement);
  return {
    name: name,
    buy: buy,
    sell: sell,
    high: buy,
    low: sell,
    opening,
    change: getChange(opening, buy),
    history: new History(history),
    midPrice: opening,
    changePercentage: getChangePercentage(opening, buy),
  }
}

const tick = data => {
  const { high, low, opening, history } = data
  const priceMovement = getPriceMovement()
  let midPrice = +(either(data.buy, data.sell))
  if (midPrice === data.midPrice) {
    midPrice = midPrice + getPriceMovement()
  }
  const buy = getBuy(midPrice, priceMovement)
  const sell = getSell(midPrice, priceMovement)
  return Object.assign({}, data, {
    buy,
    sell,
    midPrice,
    history,
    high: Math.max(high, buy),
    low: Math.min(low, sell),
    change: getChange(opening, buy),
    changePercentage: getChangePercentage(opening, buy),
  })
}

// Finance utils
const getBuy = (midPrice, priceMovement) =>
  +(midPrice + priceMovement).toFixed(2)

const getSell = (midPrice, priceMovement) =>
  +(midPrice - priceMovement).toFixed(2)

const getChange = (opening, buy) =>
  +(opening - buy).toFixed(2)

const getChangePercentage = (opening, change) =>
  getPercentage(opening, change)

const getPriceMovement = () =>
  random(0.1, 5)

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

const either = (a, b) => +_.random(0, 1, 0) ? a : b

const getPercentage = (total, value) => +(value / total * 100).toFixed(2)

const priceFormat = n => +n.toFixed(2)
