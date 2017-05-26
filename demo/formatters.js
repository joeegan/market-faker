export const formatPrice = (num, bullish, bearish) => {
  let color = 'white'
  if (bullish) {
    color = 'red'
  } else if (bearish) {
    color = 'blue'
  }
  return colorSpan(color, num.toFixed(2))
}

export const formatChange = num => {
  const color = num > 0 ? 'blue' : 'red'
  return colorSpan(color, num.toFixed(2))
}

const colorSpan = (color, content) =>
  `<span class=${color}>${content}</span>`
