import { ActivatedRouteSpy } from "src/app/testing/ActivatedRouteSpy";
import { PlayersSpy } from "src/app/testing/PlayersSpy";
import { RouterSpy } from "src/app/testing/RouterSpy";
import { ViewObject } from "src/app/testing/ViewObject";
import { getAListOfPlayersWhereOneOfThemIsFromUSA, getEmptySampleResponse, getSampleError } from "./players-list.component.spec.helper";
import { getAListOfSamplePlayers } from "./players-list.component.spec.helper";
import { getAListOfPlayersWhereOneOfThemIsCalledAlanPichot } from "./players-list.component.spec.helper";
import { PlayersListComponent } from "../players-list.component";

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

        this.playersSpy.getListBy().return(getAListOfPlayersWhereOneOfThemIsCalledAlanPichot());
        this.activatedRouteSpy.paramMap().return('sampleRegion');

        this.initComponent();

        const rowsBefore = this.viewObject.getElements('tr');
        const AlanRowsBefore = this.viewObject.getElementsByText('tr', 'Alan');

        expect(rowsBefore.length).toBe(3);
        expect(AlanRowsBefore.length).toBe(1);
    }

    givenTheComponentIsLoadedWithFourSamplePlayersWhereOneOfThemIsFromUSA(){
        this.playersSpy.getListBy().return(getAListOfPlayersWhereOneOfThemIsFromUSA());
        this.activatedRouteSpy.paramMap().return('sampleRegion');
      
        this.initComponent();

        const rowsBefore = this.viewObject.getElements('tr');
        const USARowsBefore = this.viewObject.getElementsByText('tr', "USA")
  
        expect(rowsBefore.length).toBe(4);
        expect(USARowsBefore.length).toBe(1);
    }

    givenTheComponentIsLoadedWithSamplePlayers(){
        this.playersSpy.getListBy().return(getAListOfSamplePlayers());
        this.activatedRouteSpy.paramMap().return('sampleRegion');

        this.initComponent();
    }

    givenTheComponentIsLoadedWithAnEmptyList(){
        this.playersSpy.getListBy().return(getEmptySampleResponse());
        this.activatedRouteSpy.paramMap().return('sampleRegion');
    
        this.initComponent();
    }

    givenTheComponentIsLoadedWithSamplePlayersAndTheRegionIsWorld(){
        this.playersSpy.getListBy().return(getAListOfSamplePlayers());
        this.activatedRouteSpy.paramMap().return('world');
    
        this.initComponent();
    }

    givenTheComponentIsLoadedWithSamplePlayersAndTheRegionIsArgentina(){
        this.playersSpy.getListBy().return(getAListOfSamplePlayers());
        this.activatedRouteSpy.paramMap().return('argentina');
    
        this.initComponent();
    }


    givenTheComponentGetsASampleErrorRetrievingPlayers():{ navigateSpy: jasmine.Spy<any>}{
        this.playersSpy.getListBy().throw(getSampleError())
        const navigateSpy = this.routerSpy.navigateByUrl().resolve(true);
        this.activatedRouteSpy.paramMap().return('sampleRegion');
    
        this.initComponent();

        return { navigateSpy };
    }

    whenTheListIsFilteredByAlan(){
        this.viewObject.setText('.filter-container input#filter', 'Alan');
        this.viewObject.updateView();
    }

    whenThePlayerCalledAlanIsDeleted(){
        const AlanRowsBefore = this.viewObject.getElementsByText('tr', 'Alan');
        this.viewObject.clickOnElement('td button', AlanRowsBefore[0])
        this.viewObject.updateView();
    }

    whenAllOfThePlayersAreDeleted(){
        while(this.viewObject.isThereA('tr')){
            this.viewObject.clickOnElement('tr td button')
            this.viewObject.updateView();
        }
    }

    whenTheListIsFilteredByUSA(){
        this.viewObject.setText('.filter-container input#filter', "USA");
        this.viewObject.updateView();

    }

    thenTheListJustShowsThePlayerAlan(){
        const rowsAfter = this.viewObject.getElements('tr');
        const AlanRowsAfter = this.viewObject.getElementsByText('tr', 'Alan');

        expect(rowsAfter.length).toBe(1);
        expect(AlanRowsAfter.length).toBe(1);
    }

    thenTheListDoesNotShowThePlayerAlan(){
        const rowsAfter = this.viewObject.getElements('tr');
        const AlanRowsAfter = this.viewObject.getElementsByText('tr', 'Alan')

        expect(rowsAfter).toHaveSize(2);
        expect(AlanRowsAfter).toHaveSize(0);
    }

    thenTheListIsEmpty(){
        const rowsAfterDeletingElems = this.viewObject.getElements('tr');
        expect(rowsAfterDeletingElems).toHaveSize(0);  
    }

    thenThereIsAMessageThatSaysNoPlayers(){
        const messageText = this.viewObject.getText('p');
        expect(messageText).toBe('☢ No players ☢');
    }

    thenTheTitleShowsTOP10PlayersWorld(){
        const h3Text = this.viewObject.getText('h3');
        expect(h3Text).toBe('TOP 10 Players - WORLD');
    }

    thenTheTitleShowsTOP10PlayersArgentina(){
        const h3Text = this.viewObject.getText('h3');
        expect(h3Text).toBe('TOP 10 Players - ARGENTINA');
    }

    thenTheComponentRedirectsToTheNotFoundPage(navigateSpy:jasmine.Spy<any>){
        expect(navigateSpy).toHaveBeenCalledOnceWith('not-found');
    }

    thenTheListJustShowsThePlayerFromUSA(){

      const rowsAfter = this.viewObject.getElements('tr');
      const USARowsAfter = this.viewObject.getElementsByText('tr', "USA");

      expect(rowsAfter.length).toBe(1);
      expect(USARowsAfter.length).toBe(1);
    }
}