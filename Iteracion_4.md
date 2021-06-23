# Iteración 4

## Esto es muy engorroso de escribir, demasiado verboso.

### ¿Con que problemas no fuimos encontrando en la iteración 3?.

Afortunadamente, ya habíamos logrado superar la confusion que a veces se producia por mal interpretar con que datos se corrian los tests dado que ya no teniamos que ir a ver que datos globales tenia seteado un servicio, pero nos seguía faltando algo, mejorar la verbosidad del codigo para seleccionar elementos por ejemplo. **¡No puede ser que tengamos que escribir tantas lineas para dar un click!** Si lograbamos eso, tambien nos iba a ayudar a mejorar nuestra fluidez para escribir y la legibilidad. **Queríamos leer que se estaba probando**, no leer como lo hace y eso no lo estabamos consiguiendo.

### ¿Como reaccionamos?

Comenzamos a pensar en la idea de encapsular el codigo que necesita jasmine para interactuar con la vista, y asi fue como empezó a cobrar vida nuestra clase ViewObject. La realidad era que solo ibamos a necesitar una referencia a nuestro componente y desde ahi ya tendríamos acceso a todo lo necesario.


### ViewObject

```js
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class ViewObject {
  private _fixture: ComponentFixture<any>;

  constructor(fixture:ComponentFixture<any>) {
    this._fixture = fixture;
  }

  get fixture(): ComponentFixture<any> {
    return this._fixture;
  }

  updateView() {
    this._fixture.detectChanges();
  }

  getElement(cssSelector: string): DebugElement {
    return this._fixture.debugElement.query(By.css(cssSelector));
  }

  getNativeElement(cssSelector: string): any {
    return this._fixture.debugElement.query(By.css(cssSelector)).nativeElement;
  }

  clickOnElement(cssSelector: string) {
    this.getNativeElement(cssSelector).click();
  }
```

### Codigo Ejemplo - 1

```js
it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfPlayersWhereOneOfThemIsFromUSA()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      //(<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})
      activatedRouteRef.paramMap = of({ get(){ return 'sampleRegion' }})

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

### Codigo Ejemplo - 2

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      //(<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})
      activatedRouteRef.paramMap = of({ get(){ return 'sampleRegion' }})

      initComponent();

      while(viewObject.isThereA('tr')){
        viewObject.clickOnElement('tr td button')
        viewObject.updateView();
      }

      const rowsAfterDeletingElems = viewObject.getElements('tr');
      expect(rowsAfterDeletingElems).toHaveSize(0);

      const messageText = viewObject.getText('p');
      expect(messageText).toBe('☢ No players ☢');
    })
```