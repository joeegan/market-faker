import { market } from '../src/market'

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
