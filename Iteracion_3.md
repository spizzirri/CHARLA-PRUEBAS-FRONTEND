# Iteración 3

## Solo agreguemos un método mas, un initComponent

### ¿Con que problemas no fuimos encontrando en la iteración 2?.

En nuestro proyecto, al momento en el que estabamos trabajando en estas soluciones, teniamos la versión 9 del framework llamado Angular. Esto es importante porque la forma en la que nos estaba generando el codigo base para escribir las pruebas unitarias nos estaba generando un problema. 

### Contexto 

```js
  beforeEach(() => {
    // Crea el componente
    fixture = TestBed.createComponent(PlayersListComponent);
    // Obtiene la instancia de la clase
    component = fixture.componentInstance;
    // Actualiza / Refresca el DOM
    // La primera vez que se llama produce la ejecución del evento onInit.
    fixture.detectChanges();
  });
```

Este beforeEach lo que hace es instanciar el componente y refrescar/actualizar el HTML ( eso es lo que hace el metodo **detectChanges** )
En el caso particular de Angular, cuando ese metodo se ejecuta por primera vez, se invoca al evento **onInit** de Angular. 

### ¿Cual era el problema?

El problema que teniamos era que esa primera vez que se ejecuta el onInit y dado que queríamos tener los mocks de forma local,
necesitabamos que el primer detectChanges se ejecute despues.

### ¿Como reacciónamos? 

Decidimos eliminar ese beforeEach y crear una función global que se encargue de inicializar el componente luego de haber configurado las respuestas de cada servicio.

```js
function initComponent(){
  fixture = TestBed.createComponent(PlayersListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}
```

### Codigo Ejemplo 1

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

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      //(<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})
      activatedRouteRef.paramMap = of({ get(){ return 'sampleRegion' }})

      initComponent();
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