import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { PlayersService } from '../../shared/services/players.service';
import { SharedModule } from '../../shared/share.module';
import { PlayersListComponent } from '../players-list.component';
import { getAListOfPlayersWhereOneOfThemIsCalledAlanPichot, 
         getAListOfSamplePlayers, 
         getAListOfPlayersWhereOneOfThemIsFromUSA } from './players-list.component.spec.helper';
import { ViewObject } from '../../testing/ViewObject';
import { PlayersServiceMock } from '../../testing/MockedClasses';

let viewObject:ViewObject;
let component:PlayersListComponent;

describe('[Iteracion 4] - PlayersListComponent', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: ':region',
            component: PlayersListComponent
          }]), 
        FormsModule, 
        SharedModule],
      declarations: [ PlayersListComponent, FilterPipe ],
      providers: [
        { provide: PlayersService, useClass: PlayersServiceMock },
        { provide: ActivatedRoute, useValue: {paramMap: of()}}
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    initComponent();
    expect(component).toBeTruthy();
  });

  it(`should show just the player called "Pichot, Alan"
      when the word "Alan" is typped in the input filter box
       and there is not other row with the word "Alan"`, ()=>{

        const playerServiceRef = getTestBed().inject(PlayersService);
        spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfPlayersWhereOneOfThemIsCalledAlanPichot()))
        const activatedRouteRef = getTestBed().inject(ActivatedRoute);
        (<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})

        initComponent();
        const rowsBefore = viewObject.getElements('tr');
        const AlanRowsBefore = viewObject.getElementsByText('tr', 'Alan');

        expect(rowsBefore.length).toBe(3);
        expect(AlanRowsBefore.length).toBe(1);

        viewObject.setText('.filter-container input#filter', 'Alan');
        viewObject.updateView();

        const rowsAfter = viewObject.getElements('tr');
        const AlanRowsAfter = viewObject.getElementsByText('tr', 'Alan');

        expect(rowsAfter.length).toBe(1);
        expect(AlanRowsAfter.length).toBe(1);

    })

    it(`shouldn't show the player called "Pichot, Alan"
        after the delete button is clicked`, ()=>{

        const playerServiceRef = getTestBed().inject(PlayersService);
        spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfPlayersWhereOneOfThemIsCalledAlanPichot()))
        const activatedRouteRef = getTestBed().inject(ActivatedRoute);
        (<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})

        initComponent();

        const rowsBefore = viewObject.getElements('tr');
        const AlanRowsBefore = viewObject.getElementsByText('tr', 'Alan')

        expect(rowsBefore).toHaveSize(3);
        expect(AlanRowsBefore).toHaveSize(1);

        viewObject.clickOnElement('td button', AlanRowsBefore[0])
        viewObject.updateView();

        const rowsAfter = viewObject.getElements('tr');
        const AlanRowsAfter = viewObject.getElementsByText('tr', 'Alan')

        expect(rowsAfter).toHaveSize(2);
        expect(AlanRowsAfter).toHaveSize(0);
    })

    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      (<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})

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

  it(`should show "TOP 10 Players - WORLD" 
      when the url para is world`, ()=>{

    const playerServiceRef = getTestBed().inject(PlayersService);
    spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()))
    const activatedRouteRef = getTestBed().inject(ActivatedRoute);
    (<any>activatedRouteRef).paramMap = of({ get(){ return 'world' }})

    initComponent();

    const h3Text = viewObject.getText('h3');
    expect(h3Text).toBe('TOP 10 Players - WORLD');
  })

  it(`should redirect to "not-found"  
       when the service return an error`, ()=>{

    const playerServiceRef = getTestBed().inject(PlayersService);
    spyOn(playerServiceRef, 'getListBy').and.returnValue(throwError(new Error("Invalid Region")));
    const routerRef = getTestBed().inject(Router);
    const navigateByUrlSpy = spyOn(routerRef, 'navigateByUrl').and.resolveTo(true);
    const activatedRouteRef = getTestBed().inject(ActivatedRoute);
    (<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})

    initComponent();
    
    expect(navigateByUrlSpy).toHaveBeenCalledOnceWith('not-found');
  })

  it(`should show the message "☢ No players ☢"
      when the service return an empty list`, ()=>{

    const playersServiceRef = getTestBed().inject(PlayersService);
    spyOn(playersServiceRef, 'getListBy').and.returnValue(of({ region: "", list: [] }));
    const activatedRouteRef = getTestBed().inject(ActivatedRoute);
    (<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})
    
    initComponent();
  
    const messageText = viewObject.getText('p');
    expect(messageText).toBe('☢ No players ☢');
  })

  it(`should show "TOP 10 Players - ARGENTINA" when the url param is argentina`, ()=>{
    
    const playerServiceRef = getTestBed().inject(PlayersService);
    spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()));
    const activatedRouteRef = getTestBed().inject(ActivatedRoute);
    (<any>activatedRouteRef).paramMap = of({ get(){ return 'argentina' }})

    initComponent();

    const h3Text = viewObject.getText('h3');
    expect(h3Text).toBe('TOP 10 Players - ARGENTINA');
  })

  it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfPlayersWhereOneOfThemIsFromUSA()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      (<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})
      
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
});

function initComponent(){
  viewObject = new ViewObject(PlayersListComponent)
  component = viewObject.fixture.componentInstance;
  viewObject.updateView();
}