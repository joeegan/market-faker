/*
 * An observable market with optional history
 */
const { Observable } = require('rxjs/Rx')
const History = require('./history')
import _ from 'lodash';

export const Market = spec => {

  const snapshot = getSnapshot(spec)

  const observable = Observable.create(observer => {
    let data = snapshot
    const timeout = delay => {
      setTimeout(() => {
        data = tick(data, snapshot)
        observer.next(data)
        data.history.update(data)
  	    timeout(_.random(200, 1000))
      }, delay)
    }
    timeout(_.random(200, 1000))
  })

  return Object.assign(observable, { snapshot })
}

const getSnapshot = ({ name, opening, history }) => {
  const priceMovement = getPriceMovement()
  const buy = getBuy(opening, priceMovement);
  const sell = getSell(opening, priceMovement);
  return {
    name,
    buy,
    sell,
    high: buy,
    low: sell,
    opening,
    change: getChange(opening, buy),
    history: new History(history),
    midPrice: opening,
    changePercentage: getChangePercentage(opening, buy),
  }
}

const tick = (data, snapshot) => {
  const prevData = Object.assign({}, data)
  const { high, low, history } = data
  const priceMovement = getPriceMovement()
  let midPrice = +(either(data.buy, data.sell))
  if (midPrice === data.midPrice) {
    midPrice = midPrice + getPriceMovement()
  }
  const buy = getBuy(midPrice, priceMovement)
  const sell = getSell(midPrice, priceMovement)
  const newData = Object.assign({}, data, {
    buy,
    sell,
    midPrice,
    history,
    high: Math.max(high || snapshot.high, buy),
    low: Math.min(low || snapshot.low, sell),
    change: getChange(snapshot.opening, buy),
    changePercentage: getChangePercentage(snapshot.opening, buy),
  })
  return Object.assign({ history }, objectDiff(prevData, newData))
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
  _.random(0.1, 5)

// Utils

const objectDiff = (o1, o2) => (Object.keys(o2).reduce((diff, key) => {
  if (o1[key] === o2[key]) return diff
  return {
    ...diff,
    [key]: o2[key]
  }
}, {}))

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

const either = (a, b) =>
  +_.random(0, 1, 0) ? a : b

const getPercentage = (total, value) =>
  +(value / total * 100).toFixed(2)

const priceFormat = n =>
  +n.toFixed(2)
