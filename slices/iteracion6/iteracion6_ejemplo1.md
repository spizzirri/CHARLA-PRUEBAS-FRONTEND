---
marp: true
---

```js
  it(`should show just the players from "USA"
      when there is a list of sample players around the world 
      and the word "USA" is typped in the input filter box`, ()=>{

      const step = new Step();
      
      step.givenTheComponentIsLoadedWithFourSamplePlayersWhereOneOfThemIsFromUSA();
      step.whenTheListIsFilteredByUSA();
      step.thenTheListJustShowsThePlayerFromUSA();
    })
```