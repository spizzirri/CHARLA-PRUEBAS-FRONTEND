# Iteración 5

## Los espias siguen siendo engorrosos.

### ¿Con que problemas no fuimos encontrando en la iteración 4?.

Nos faltaba resolver algo mas todavía para terminar de estar contentos, Nos faltaba resolver que hacer para no tener que reescribir una y otra vez el mismo codigo para simular la respuesta de un servicio.

### ¿Como reaccionamos?

Siguiendo la linea de ViewObject de la iteración anterior, pensamos en una clase que bautizamos APISpy, una clase que concentre la logica para simular una respuesta y al que yo solamente le deba pasar que quiero que devuelva.


### APISpy

```js
export class PlayersSpy{

    private _playersService: PlayersService;

    constructor(){
        this._playersService = getTestBed().inject(PlayersService);
    }

    getListBy(){
        const spy = spyOn(this._playersService, 'getListBy');
        return {
            return: function(value:any){
                return spy.and.returnValue(of(value));
            },
            throw: function(error:Error){
                return spy.and.returnValue(throwError(error));
            }
        }
    }
}

```


### Codigo Ejemplo - 1

```js
it(`should show just the players from "USA"
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

### Codigo Ejemplo - 2

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      playersSpy.getListBy().return(getAListOfSamplePlayers());
      activatedRouteSpy.paramMap('sampleRegion');

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