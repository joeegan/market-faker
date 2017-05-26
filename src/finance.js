import { getPercentage } from './util'
import _ from 'lodash'

export const getBuy = (midPrice, priceMovement) =>
  +(midPrice + priceMovement).toFixed(2)

export const getSell = (midPrice, priceMovement) =>
  +(midPrice - priceMovement).toFixed(2)

export const getChange = (opening, buy) =>
  +(opening - buy).toFixed(2)

export const getChangePercentage = (opening, change) =>
  getPercentage(opening, change)

export const getPriceMovement = () => _.random(0.1, 5)

export const getUpdateTime = () => {
  const d = new Date()
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(pad)
    .join(':')
}
