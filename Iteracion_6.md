# Iteración 6


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
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

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