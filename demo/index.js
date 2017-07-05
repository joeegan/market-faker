import { getColumns } from './columns'
import { markets } from './markets'

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
