'use strict';

class Market {

  constructor(name, minLevel, maxLevel) {
    this.name = name;
    this.openingLevel = this.getRandomFromRange(minLevel, maxLevel);
    (function foo() {
      // (foo() => {
      this.buyPrice = this.getRandomFromRange(minLevel, maxLevel);
      this.sellPrice = this.getRandomFromRange(this.buyPrice - 10, this.buyPrice - 1);
      if (!this.low || this.low < this.sellPrice) {
        this.low = this.sellPrice;
      }

      if (!this.high || this.high < this.buyPrice) {
        this.high = this.buyPrice;
      }

      this.percentage = this.getPercentage(minLevel, maxLevel, this.buyPrice);
      this.change = (this.openingLevel - this.buyPrice).toFixed(1);
      var d = new Date();
      this.update = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      setTimeout(foo.bind(this), this.getIntervalSpeed.call(this));
    }.bind(this))();
  }

  getIntervalSpeed() {
    this.intervalSpeed = this.getRandomFromRange(500, 2500);
    this.volPercentage = this.getPercentage(100, 500, this.intervalSpeed);
    this.volDecimal = this.volPercentage / 100;
    return this.intervalSpeed;
  }

  getRandomFromRange(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  getPercentage(min, max, value) {
    var range = max - min;
    var x = value - min;
    return Math.round((100 * x) / range);
  }

}
