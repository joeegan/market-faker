import { market } from '../src/market'
import { getColumns } from './columns'

const history = {
  buy: 1,
  sell: 1,
  midPrice: 18,
}

export const markets = [
  market({
    name: 'Foobar PLC',
    opening: 1271.0,
    history,
  }),
  market({
    name: 'Bazqux PLC',
    opening: 1500.0,
    history,
  }),
  market({
    name: 'CNY/USD',
    opening: 14500.0,
    history,
  }),
  market({
    name: 'Duckbill PLC',
    opening: 271.0,
    history,
  }),
  market({
    name: 'Beer bear Holdings',
    opening: 4500.0,
    history,
  }),
  market({
    name: 'Bitcoin',
    opening: 2000.0,
    history,
  }),
  market({
    name: 'Litecoin',
    opening: 1271.0,
    history,
  }),
  market({
    name: 'Brian Mills Securities',
    opening: 1500.0,
    history,
  }),
  market({
    name: 'Flamingo Holdings',
    opening: 14500.0,
    history,
  }),
  market({
    name: 'Haribo Holdings',
    opening: 1071.0,
    history,
  }),
  market({
    name: 'Wonton PLC',
    opening: 4001.0,
    history,
  }),
  market({
    name: 'Leisurewood Hills Ltd',
    opening: 1430.0,
    history,
  }),
]

const header =
  '<thead><tr>' +
  getColumns().reduce((str, { heading = '' }, i) => {
    return (str += `<th>${heading}</th>`)
  }, '') +
  '</tr></thead>'

const rows = snapshots =>
  '<tbody>' +
  snapshots.reduce((str, market, i) => {
    const content = _.reduce(
      market,
      (str, value, key) => {
        return str + `<td class=${key}>${value}</td>`
      },
      ''
    )
    return (str += `<tr id=market${i}>${content}</tr>`)
  }, '') +
  '</tbody>'

const snapshotsFormatted = markets.map((m, i) => {
  return getColumns(m.snapshot, i).reduce(
    (o, col) => ({
      ...o,
      [col.key]: col.formatter(),
    }),
    {}
  )
})

const updateRow = (data, i) => {
  for (let key in data) {
    const col = getColumns(data, i).find(d => d.key === key)
    if (col) {
      col.dom.innerHTML = col.formatter()
    }
  }
}

window.onload = () => {
  document.querySelector('table').innerHTML =
    header + rows(snapshotsFormatted)

  markets.forEach((m, i) => {
    m.subscribe(d => {
      updateRow(d, i)
    })
  })
}
