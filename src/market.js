/*
 * An observable market with optional history
 */
const { Observable } = require('rxjs/Rx')
const History = require('./history')

module.exports = class Market {

  constructor(spec) {
    this.name = spec.name
    this.opening = spec.opening
    this.history = new History(spec.history)
    this.calculateSecondaryProps()

    return Observable
      .of('')
      .map(n => this.json)
      .do(n => this.calculateSecondaryProps())
      .do(n => this.history.update(this.json))
      .concatMap(json => {
        return Observable
          .of(json)
          .delay(random(500, 1000))
      })
      .repeat()

  }

  calculateSecondaryProps() {
    this.priceDistance = random(0.1, 5) / 2
    this.midPrice = +(or(this.buy, this.sell) || this.opening)
    this.high = this.getHigh()
    this.low = this.getLow()
  }

  getAll(props) {
    return props.reduce((acc, prop) => {
      return Object.assign(acc, {
        [prop]: this[prop],
      })
    }, {})
  }

  getHigh() {
    const { high, buy } = this
    if (!high) {
      return buy
    }
    return buy > high ? buy : high
  }

  getLow() {
    const { low, sell } = this
    if (!low) {
      return sell
    }
    return sell < low ? sell : low
  }

  get json() {
    return this.getAll([
      'name',
      'buy',
      'sell',
      'high',
      'low',
      'midPrice',
      'change',
      'history',
      'changePercentage',
    ])
  }

  get buy() {
    return +(this.midPrice + this.priceDistance).toFixed(2)
  }

  get sell() {
    return +(this.midPrice - this.priceDistance).toFixed(2)
  }

  get change() {
    return +(this.opening - this.buy).toFixed(2)
  }

  get changePercentage() {
    return getPercentage(this.opening, this.change)
  }

}

function pad(num) {
  const str = num.toString()
  return str.length > 1 ? str : '0' + str
}

function getUpdateTime() {
  var d = new Date()
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map(pad).join(':')
}

function random(min, max, decimalPoints = 1) {
  return +(Math.random() * (max - min) + min).toFixed(decimalPoints)
}

function or(a, b) {
  return +random(0, 1, 0) ? a : b
}

function getPercentage(total, value) {
  return +(value / total * 100).toFixed(2)
}

function priceFormat(num) {
  return +num.toFixed(2)
}
