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
import { PlayersServiceMock } from '../../testing/MockedClasses';


let component: PlayersListComponent;
let fixture: ComponentFixture<PlayersListComponent>;

describe('[Iteracion 3] - PlayersListComponent', () => {

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
        const rowsBefore = fixture.debugElement.queryAll(By.css('tr'));
        const AlanRowsBefore = rowsBefore.filter( row => row.nativeElement.textContent.includes('Alan'))

        expect(rowsBefore.length).toBe(3);
        expect(AlanRowsBefore.length).toBe(1);

        const filterElement = fixture.debugElement.query(By.css('.filter-container input#filter'));
        filterElement.nativeElement.value = 'Alan';
        filterElement.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const rowsAfter = fixture.debugElement.queryAll(By.css('tr'));
        const AlanRowsAfter = rowsAfter.filter( row => row.nativeElement.textContent.includes('Alan'))

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

        const rowsBefore = fixture.debugElement.queryAll(By.css('tr'));
        const AlanRowsBefore = rowsBefore.filter( row => row.nativeElement.textContent.includes('Alan'))

        expect(rowsBefore).toHaveSize(3);
        expect(AlanRowsBefore).toHaveSize(1);

        const deleteButton = AlanRowsBefore[0].query(By.css('td button'));
        deleteButton.nativeElement.click();

        fixture.detectChanges();

        const rowsAfter = fixture.debugElement.queryAll(By.css('tr'));
        const AlanRowsAfter = rowsAfter.filter( row => row.nativeElement.textContent.includes('Alan'))

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

  it(`should show "TOP 10 Players - WORLD" 
      when the url para is world`, ()=>{

    const playerServiceRef = getTestBed().inject(PlayersService);
    spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()))
    const activatedRouteRef = getTestBed().inject(ActivatedRoute);
    (<any>activatedRouteRef).paramMap = of({ get(){ return 'world' }})

    initComponent();

    const h3Elem = fixture.debugElement.query(By.css('h3'));
    expect(h3Elem.nativeElement.textContent.trim()).toBe('TOP 10 Players - WORLD');
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
  
    const messageElems = fixture.debugElement.query(By.css('p'))
    expect(messageElems.nativeElement.textContent.trim()).toBe('☢ No players ☢');
  })

  it(`should show "TOP 10 Players - ARGENTINA" when the url param is argentina`, ()=>{
    
    const playerServiceRef = getTestBed().inject(PlayersService);
    spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()));
    const activatedRouteRef = getTestBed().inject(ActivatedRoute);
    (<any>activatedRouteRef).paramMap = of({ get(){ return 'argentina' }})

    initComponent();
    const h3Elem = fixture.debugElement.query(By.css('h3'));
    expect(h3Elem.nativeElement.textContent.trim()).toBe('TOP 10 Players - ARGENTINA');
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
});

function initComponent(){
  fixture = TestBed.createComponent(PlayersListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}