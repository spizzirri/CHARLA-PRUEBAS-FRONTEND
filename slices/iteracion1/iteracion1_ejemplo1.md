---
marp: true
---

```js
  it(`should show the message "☢ No players ☢"
      when the service returns an empty list`, ()=>{

    const playersServiceRef = getTestBed().inject(PlayersService);
    spyOn(playersServiceRef, 'getListBy').and.returnValue(of({ region: "", list: [] }));
    
    component.ngOnInit();
    fixture.detectChanges();

    const messageElems = fixture.debugElement.query(By.css('p'))
    expect(messageElems.nativeElement.textContent.trim()).toBe('☢ No players ☢');
  })
```