---
marp: true
---

```js
it(`should show just the players from "USA"
      when there is a list of sample players around the world 
      and the word "USA" is typped in the input filter box`, ()=>{

    const filterValue = "USA";

    const playerServiceRef = getTestBed().inject(PlayersService);
    spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getPlayersWorldRegion()))
    
    component.ngOnInit();
    fixture.detectChanges();

    const rowsBefore = fixture.debugElement.queryAll(By.css('tr'));
    const USARowsBefore = rowsBefore.filter( row => row.nativeElement.textContent.includes(filterValue))

    expect(rowsBefore.length).toBe(4);
    expect(USARowsBefore.length).toBe(1);

    const filterElement = fixture.debugElement.query(By.css('.filter-container input#filter'));
    filterElement.nativeElement.value = filterValue;
    filterElement.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const rowsAfter = fixture.debugElement.queryAll(By.css('tr'));
    const USARowsAfter = rowsAfter.filter( row => row.nativeElement.textContent.includes(filterValue))

    expect(rowsAfter.length).toBe(1);
    expect(USARowsAfter.length).toBe(1);
    })
```
