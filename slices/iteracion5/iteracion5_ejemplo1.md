---
marp: true
---

```js
it(`sshould show just the players from "USA"
      when there is a list of sample players around the world 
      and the word "USA" is typped in the input filter box`, ()=>{

      playersSpy.getListBy().return(getAListOfPlayersWhereOneOfThemIsFromUSA());
      activatedRouteSpy.paramMap('sampleRegion');
      
      initComponent();

      const filterValue = "USA";
      const rowsBefore = viewObject.getElements('tr');
      const USARowsBefore = viewObject.getElementsByText('tr', filterValue)

      expect(rowsBefore.length).toBe(4);
      expect(USARowsBefore.length).toBe(1);

      viewObject.setText('.filter-container input#filter', filterValue);
      viewObject.updateView();

      const rowsAfter = viewObject.getElements('tr');
      const USARowsAfter = viewObject.getElementsByText('tr', filterValue)

      expect(rowsAfter.length).toBe(1);
      expect(USARowsAfter.length).toBe(1);
    })
```

