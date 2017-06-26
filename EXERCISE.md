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
         <td>Foobar PLC</td>
         <td>▁▂▃▄▄▅▆▇▆▆▆▇▇▇▆▇█▆</td>
         <td><span>1277.68</span></td>
         <td><span>1285.26</span></td>
         <td>1285.26</td>
         <td>1267.12</td>
         <td><span>-14.26</span></td>
         <td><span>101.12</span></td>
      </tr>
   </tbody>
</table>
```
