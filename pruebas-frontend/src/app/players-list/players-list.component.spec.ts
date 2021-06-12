import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { PlayersService } from '../shared/services/players.service';
import { SharedModule } from '../shared/share.module';

import { PlayersListComponent } from './players-list.component';

class PlayersServiceMock {
  getListBy(){
    return of([
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
      }
    ])
  }
}

describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SharedModule],
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

  it(`should show just the player "Pichot, Alan"
      when the word "Alan" is typped in the input filter box
       and there is not other row with the word "Alan"`, ()=>{

        const rowsBefore = fixture.debugElement.queryAll(By.css('tr'));
        const AlanRowsBefore = rowsBefore.filter( row => row.nativeElement.textContent.includes('Alan'))

        expect(rowsBefore.length).toBe(2);
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
});
