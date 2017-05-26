import { formatPrice, formatChange } from './formatters'
import sparkline from 'sparkline'

export const getColumns = (data, i = 0) => {
  let bullish, bearish
  if (data) {
    const [previousBuy] = data.history.buy
    bullish = previousBuy < data.buy
    bearish = previousBuy > data.buy
  }
  return [
    {
      key: 'name',
      formatter: () => data.name,
    },
    {
      key: 'history',
      formatter: () => sparkline(data.history.midPrice),
    },
    {
      key: 'sell',
      heading: 'Sell',
      formatter: () =>
        formatPrice(data.sell, bullish, bearish),
    },
    {
      key: 'buy',
      heading: 'Buy',
      formatter: () =>
        formatPrice(data.buy, bullish, bearish),
    },
    {
      key: 'high',
      heading: 'High',
      formatter: () => data.high.toFixed(2),
    },
    {
      key: 'low',
      heading: 'Low',
      formatter: () => data.low.toFixed(2),
    },
    {
      key: 'change',
      heading: 'Change (pts)',
      formatter: () => formatChange(data.change),
    },
    {
      key: 'changePercentage',
      heading: 'Change %',
      formatter: () => formatChange(data.changePercentage),
    },
  ].map(col => ({
    ...col,
    dom: document.querySelector(`#market${i} .${col.key}`),
  }))
}
