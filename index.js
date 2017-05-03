class Market {

  constructor(name, midPrice) {
    this.name = name;
    this.opening = midPrice;
    this.lastMidTicks = [];
    loop(this.setData, getTickSpeed, this);
  }

  setData() {
    const priceDistance = random(0.1, 5) / 2;
    const midPrice = +(or(this.buy, this.sell) || this.opening);
    const buy = getBuy(midPrice, priceDistance);
    this.changePercentage = getPercentage(this.opening, this.change);

    this.hasRisen = buy > this.buy;
    this.hasDropped = buy < this.buy;
    this.buy = buy;
    this.sell = getSell(midPrice, priceDistance);

    this.low = getLow(this.low, this.sell);
    this.high = getHigh(this.high, this.buy);
    this.change = getChange(this.opening, this.buy);
    this.updateTime = getUpdateTime();
    this.lastMidTicks.push(midPrice);
  }

}

function loop(func, speedFunc, context) {
  (function tick() {
    func.call(context);
    setTimeout(tick, speedFunc());
  }());
}

function getTickSpeed() {
  return random(100, 500);
}

function getBuy(midPrice, priceDistance) {
  return +(midPrice + priceDistance).toFixed(2);
}

function getSell(midPrice, priceDistance) {
  return +(midPrice - priceDistance).toFixed(2);
}

function getChange(opening, buy) {
  return +(opening - buy).toFixed(2);
}

function getLow(low, sell) {
  if (!low) {
    return sell;
  }
  return sell < low ? sell : low;
}

function getHigh(high, buy) {
  if (!high) {
    return buy;
  }
  return buy > high ? buy : high;
}

function pad(num) {
  const str = num.toString();
  return str.length > 1 ? str : '0' + str;
}

function getUpdateTime() {
  var d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map(pad).join(':');
}

function random(min, max, decimalPoints = 1) {
  return +(Math.random() * (max - min) + min).toFixed(decimalPoints);
}

function or(a, b) {
  return +random(0, 1, 0) ? a : b;
}

function getPercentage(total, value) {
  return +(value / total * 100).toFixed(2);
}

function priceFormat(num) {
  return +num.toFixed(2);
}

module.exports = { Market };
