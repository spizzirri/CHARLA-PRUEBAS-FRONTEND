---
marp: true
---

```js
  it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

      const step = new Step();
      
      step.givenTheComponentIsLoadedWithFourSamplePlayersWhereOneOfThemIsFromUSA();
      step.whenTheListIsFilteredByUSA();
      step.thenTheListJustShowsThePlayerFromUSA();
    })
```