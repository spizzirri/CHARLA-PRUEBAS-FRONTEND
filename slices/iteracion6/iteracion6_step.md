---
marp: true
---

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