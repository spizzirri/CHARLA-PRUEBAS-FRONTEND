---
marp: true
---

```js
  it(`should show the message "☢ No players ☢"
      when the service return an empty list`, ()=>{

    // Aqui se pide una referencia al servicio y luego se lo setea el mock
    const playersServiceRef = getTestBed().inject(PlayersService);
    spyOn(playersServiceRef, 'getListBy').and.returnValue(of({ region: "", list: [] }));
    
    // Se invoca al evento init otra vez (por defecto ya se hace en el beforeEach)
    component.ngOnInit();
    fixture.detectChanges();

    const messageElems = fixture.debugElement.query(By.css('p'))
    expect(messageElems.nativeElement.textContent.trim()).toBe('☢ No players ☢');
  })
```