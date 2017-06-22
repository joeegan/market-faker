const markets = require('./index').markets;

describe('markets', () => {
  it('should be an array', () => {
    expect(markets.length).toBe(3);
  });
});
