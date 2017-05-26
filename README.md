![Screencast](https://raw.githubusercontent.com/joeegan/market-faker/master/animation.gif)

This npm module provides simulated financial market data.

## Motivation

To use financial data that is not reliant on external sources to avoid problems such as API key expiry, out-of-hours markets, data limits, downtime, and fees

## Usage

```bash
yarn add market-faker
```

```
import market from 'market-faker'

const foo = market({
  name: 'Foobar PLC',
  opening: 1271.1,
})

console.log(foo.snapshot.sell)
// -> 1271.2

foo.subscribe(market => {
  console.log(market.sell)
  // -> 1270.6
})
```

# Characteristics of a Market
* Prices tick at random intervals
* Only the properties that have changed come back in the `subscribe` handlers
* The initial market properties are available as `market.snapshot`
* `buy` price and `sell` price are a small but random distance apart. They start either side of the `opening`
* `change` is the difference from the `buy` and the `opening`
* `changePercentage` shows the change as a percentage of the `opening`
* `high` is the maximum a `buy` price has been
* `low` is the lowest the `sell` price has been
* Historical data for any existing property of the market can be specified with a `history` object. e.g. The following would include the last 3 buy prices in the subscribable data:

```javascript
const foo = market({
  name: 'Foobar PLC',
  opening: 1271.1,
  history: {
    buy: 3,
  },
})

foo.subscribe(market => {
  console.log(market.history.buy)
  // -> [1270.6, 1271.1, 1269.3]
})

```
