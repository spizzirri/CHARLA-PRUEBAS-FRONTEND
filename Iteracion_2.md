# Iteración 2 

## Vuelta atrás, NO a los mocks globales

### ¿Con que problemas no fuimos encontrando en la iteración 1?.

Luego de haber experimentado con el hecho de utilizar mocks globales, que si bien nos parecía una buena idea, terminó pasando que en el dia a dia nos era muy dificil mantener un acuerdo sobre que conjunto de datos debería representar a ese mock global para un servicio particular. Lo que terminaba pasando, era que una vez que el archivo contenia varias pruebas ya perdia sentido este concepto, porque cada prueba era única y necesitaba, en muchas veces, una respuesta particular.

### ¿Como reaccionamos?

Lo que empezamos hacer, dado el problema que empezamos a ver, fue comenzar a declarar los mocks siempre en cada prueba sin utilizar el mock global. Eso además nos daba claridad, para saber exactamente con que datos se estaba ejecutando nuestra prueba sin necesidad de ir a buscar la definición global lo que lo hacía algo engorroso.


### Codigo Ejemplo 1

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

### Codigo Ejemplo 2
```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      let row = fixture.debugElement.query(By.css('tr'));
      while(row){
        const deleteButton = row.query(By.css('td button'));
        deleteButton.nativeElement.click();
        fixture.detectChanges();
        row = fixture.debugElement.query(By.css('tr'));
      }

      const rowsAfterDeletingElems = fixture.debugElement.queryAll(By.css('tr'));
      expect(rowsAfterDeletingElems).toHaveSize(0);

      const messageElems = fixture.debugElement.query(By.css('p'))
      expect(messageElems.nativeElement.textContent.trim()).toBe('☢ No players ☢');
    })
```