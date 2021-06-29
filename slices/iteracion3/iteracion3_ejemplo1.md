---
marp: true
---

```js
it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfPlayersWhereOneOfThemIsFromUSA()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      //(<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }});
      activatedRouteRef.paramMap = of({ get(){ return 'sampleRegion' }});

      initComponent();

      const filterValue = "USA";
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