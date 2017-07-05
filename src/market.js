/*
 * An observable market with optional history
 */
import _ from 'lodash'
import History from './history'
import { Observable } from 'rxjs/Rx'
import {
  getPriceMovement,
  getBuy,
  getSell,
  getChange,
  getChangePercentage,
} from './finance'
import { objectDiff, getPercentage, either } from './util'

export const market = spec => {
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
  const buy = getBuy(opening, priceMovement)
  const sell = getSell(opening, priceMovement)
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
  const { high, low, history } = data
  const priceMovement = getPriceMovement()
  let midPrice = +either(data.buy, data.sell)
  if (midPrice === data.midPrice)
    midPrice += getPriceMovement()

  const buy = getBuy(midPrice, priceMovement)
  const sell = getSell(midPrice, priceMovement)
  const newData = {
    ...data,
    buy,
    sell,
    midPrice,
    history,
    high: Math.max(high || snapshot.high, buy),
    low: Math.min(low || snapshot.low, sell),
    change: getChange(snapshot.opening, buy),
    changePercentage: getChangePercentage(
      snapshot.opening,
      buy
    ),
  }
  return Object.assign(
    {},
    { history },
    objectDiff(data, newData)
  )
}
