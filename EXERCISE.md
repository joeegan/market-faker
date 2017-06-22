Build a streaming table that looks like so for the browser:

![Screencast](https://raw.githubusercontent.com/joeegan/market-faker/master/animation.gif)

See README.md for a brief overview of the market-faker.

There is some starter code in index.js that will get you started, but you will need to modify it when you come to implement the sparkline (▁▂▃▄▄▅▆▂).
You can use the [sparkline library](https://www.npmjs.com/package/sparkline) which is installed.

Use [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) to look up any JavaScript documentation. Refrain from using any libs.

**Priorities**

1. Working
2. Scalable
3. Maintainable
4. Performant
5. Extra features e.g. sorting

Example markup result, which you can use as a reference:

```html
<table>
   <thead>
      <tr>
         <th></th>
         <th></th>
         <th>Sell</th>
         <th>Buy</th>
         <th>High</th>
         <th>Low</th>
         <th>Change (pts)</th>
         <th>Change %</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td class="name">Foobar PLC</td>
         <td class="history">▁▂▃▄▄▅▆▇▆▆▆▇▇▇▆▇█▆</td>
         <td class="sell"><span class="blue">1277.68</span></td>
         <td class="buy"><span class="blue">1285.26</span></td>
         <td class="high">1285.26</td>
         <td class="low">1267.12</td>
         <td class="change"><span class="red">-14.26</span></td>
         <td class="changePercentage"><span class="blue">101.12</span></td>
      </tr>
      <tr>
         <td class="name">Bazqux PLC</td>
         <td class="history">▂▂▂▁▂▄▃▃▄▄▄▅▆▇▇▆▆█</td>
         <td class="sell"><span class="red">4537.32</span></td>
         <td class="buy"><span class="red">4540.44</span></td>
         <td class="high">4540.44</td>
         <td class="low">4499.06</td>
         <td class="change"><span class="red">-40.44</span></td>
         <td class="changePercentage"><span class="blue">100.90</span></td>
      </tr>
      <tr>
         <td class="name">GBP/USD</td>
         <td class="history">▁▂▂▂▂▂▂▁▂▃▄▄▅▆▅▄▆█</td>
         <td class="sell"><span class="red">14506.00</span></td>
         <td class="buy"><span class="red">14509.62</span></td>
         <td class="high">14509.62</td>
         <td class="low">14499.59</td>
         <td class="change"><span class="red">-9.62</span></td>
         <td class="changePercentage"><span class="blue">100.07</span></td>
      </tr>
   </tbody>
</table>
```
