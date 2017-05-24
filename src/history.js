module.exports = class History {

  constructor(spec) {
    for (let prop in spec) {
      const numberOfTicksToStore = spec[prop]
      this[prop] = new Array(numberOfTicksToStore).fill(null)
    }
  }

  update(data) {
    for (let prop in data) {
      if (this[prop]) {
        this[prop].splice(0, 1)
        this[prop].push(data[prop])
      }
    }
    return data
  }

}
