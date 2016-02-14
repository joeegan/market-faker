'use strict';

class Market {

  constructor(name, minLevel, maxLevel) {
    this.name = name;
    this.openingLevel = random(minLevel, maxLevel);
    (function loop(){
      this.setData(minLevel, maxLevel);
      setTimeout(loop.bind(this), this.getIntervalSpeed.call(this));
    }.bind(this)());

  }

  setData(minLevel, maxLevel) {
    this.buyPrice = random(minLevel, maxLevel);
    this.sellPrice = random(this.buyPrice - 10, this.buyPrice - 1);
    if (!this.low || this.low < this.sellPrice) {
      this.low = this.sellPrice;
    }

    if (!this.high || this.high < this.buyPrice) {
      this.high = this.buyPrice;
    }

    this.percentage = getPercentage(minLevel, maxLevel, this.buyPrice);
    this.change = (this.openingLevel - this.buyPrice).toFixed(1);
    this.updateTime = time();
  }

  getIntervalSpeed() {
    this.intervalSpeed = random(500, 2500);
    this.volPercentage = getPercentage(100, 500, this.intervalSpeed);
    this.volDecimal = this.volPercentage / 100;
    return this.intervalSpeed;
  }

}

function pad(num) {
  const str = num.toString();
  return str.length > 1 ? str : '0' + str;
}

function time() {
  var d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map(pad).join(':');
}

function random(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function getPercentage(min, max, value) {
  var range = max - min;
  return Math.round((100 * value - min) / range);
}

module.exports = Market;
