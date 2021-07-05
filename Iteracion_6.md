# Iteración 6

## Dandole un toque de GHERKIN

### ¿Con que problemas no fuimos encontrando en la iteración 5?.

Si bien ya estabamos bastante satisfechos sobre como estaban quedando nuestras pruebas, ya que eran bastante legibles para cualquiera que entrara sin conocer demasiado de las tecnologias, nos pasaba que cuando habian algunas pocas interacciones con el DOM ya se no hacia muy largo el test y uno podia llegar a perderse un poco.

### ¿Como reaccionamos?

Charlando con colegas, vimos una oportunidad de experimentar encapsulando las acciones en pasos, como si fuera gherkin.
Asi fue como empezamos a probar nuestra clase Step.

### Step

```js
export class Step{

    private viewObject:ViewObject;
    private playersSpy: PlayersSpy;
    private routerSpy: RouterSpy;
    private activatedRouteSpy: ActivatedRouteSpy;
    private component: PlayersListComponent | null;

    constructor(){
        this.component = null;
        this.viewObject = new ViewObject(PlayersListComponent)
        this.playersSpy = new PlayersSpy();
        this.routerSpy = new RouterSpy();
        this.activatedRouteSpy = new ActivatedRouteSpy();
    }

    private initComponent(){
        this.component = this.viewObject.fixture.componentInstance;
        this.viewObject.updateView();
    }

    givenTheComponentIsLoadedWithThreeSamplePlayersWhereOneOfThemIsCalledAlanPichot(){
        ................
        ................
```


### Codigo Ejemplo - 1

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

### Codigo Ejemplo - 2

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
        const step = new Step();

        step.givenTheComponentIsLoadedWithSamplePlayers();
        step.whenAllOfThePlayersAreDeleted();
        step.thenTheListIsEmpty();
        step.thenThereIsMessageThatSaysNoPlayers();
    })
```