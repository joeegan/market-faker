export const objectDiff = (o1, o2) =>
  Object.keys(o2).reduce((diff, key) => {
    if (o1[key] === o2[key]) {
      return diff
    }
    return {
      ...diff,
      [key]: o2[key],
    }
  }, {})

export const pad = n => {
  const str = n.toString()
  return str.length > 1 ? str : `0${str}`
}

export const either = (a, b) => (+_.random(0, 1, 0) ? a : b)

export const getPercentage = (total, value) =>
  +(value / total * 100).toFixed(2)
