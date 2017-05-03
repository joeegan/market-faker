![Screencast](https://raw.githubusercontent.com/joeegan/market-faker/master/animation.gif)

This npm module provides simulated financial market data.

## Motivation

To use financial data that is not reliant on external sources to avoid problems such as API key expiry, downtime, and data restrictions

## Usage

```bash
yarn add market-faker
```
```javascript
import Market from 'market-faker'

const foo = new Market('Foobar PLC', 1271.0);

foo.subscribe(market => {
  market.sell
  // -> 1270.6
})
```

# Characteristics of a Market
* Prices tick at random intervals
* `buy` price and `sell` price are a small but random distance apart. They start either side of the `opening`
* `change` is the difference from the `buy` and the `opening`
* `changePercentage` shows the change as a percentage of the `opening`
* `high` is the maximum a `buy` price has been
* `low` is the lowest the `sell` price has been
* All data other than the name should come back as type number, but limited to 2 decimal places
