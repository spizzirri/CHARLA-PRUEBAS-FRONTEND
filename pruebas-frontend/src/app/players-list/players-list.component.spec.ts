import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Player } from '../models/player';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { PlayersService } from '../shared/services/players.service';
import { SharedModule } from '../shared/share.module';
import { PlayersListComponent } from './players-list.component';

class PlayersServiceMock {
  getListBy(region:string){

    let list:Array<Player> = [];

    switch(region){
      case "arg": 
        list = [
          {
            "name": "Pichot, Alan",
            "federation": "Argentina",
            "ELO": "2630",
            "Byear": "1998"
          },
          {
            "name": "Mareco, Sandro",
            "federation": "Argentina",
            "ELO": "2629",
            "Byear": "1987"
          },
          {
            "name": "Martin, Sandro",
            "federation": "Argentina",
            "ELO": "2629",
            "Byear": "1987"
          }
        ]; break;

      case "wrd":
        list = [
          {
            "name": "Carlsen, Magnus",
            "federation": "Norway",
            "ELO": "2847",
            "Byear": "1990"
          },
          {
              "name": "Caruana, Fabiano",
              "federation": "USA",
              "ELO": "2820",
              "Byear": "1992"
          },
          {
            "name": "Ding, Liren",
            "federation": "China",
            "ELO": "2799",
            "Byear": "1992"
          },
          {
            "name": "Nepomniachtchi, Ian",
            "federation": "Russia",
            "ELO": "2792",
            "Byear": "1990"
          }
        ]; break;

      default: 
        list = new Array<Player>();
    }

    return of(list);
  }
}

describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{
          path: ':region',
          component: PlayersListComponent
        }]), 
        FormsModule, 
        SharedModule],
      declarations: [ PlayersListComponent, FilterPipe ],
      providers: [
        { provide: PlayersService, useClass: PlayersServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get(param:string){ 
                              return param ==="region"? 
                                'arg': 
                                new Error("[ActivatedRoute] Wrong param") } })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should show just the player called "Pichot, Alan"
      when the word "Alan" is typped in the input filter box
       and there is not other row with the word "Alan"`, ()=>{

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

    it(`should show the message "☢ No more players ☢"
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
      expect(messageElems.nativeElement.textContent.trim()).toBe('☢ No more players ☢');
    })

  it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

        const filterValue = "USA";

        // No tenemos bien resuelto este mock.
        // Debemos setear nuevamente un valor de retorno
        // E invocar nuevamente al ngOnInit. 
        const activatedRouteSpy = getTestBed().inject(ActivatedRoute);
        (activatedRouteSpy as any).paramMap = of({ 
                                                get(param:string){ 
                                                    return param ==="region"? 
                                                            'wrd': 
                                                            new Error("[ActivatedRoute] Wrong param") } 
                                                })
        
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
});
