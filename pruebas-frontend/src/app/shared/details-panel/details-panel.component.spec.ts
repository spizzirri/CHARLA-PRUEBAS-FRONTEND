import { Injectable } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayersService } from '../services/players.service';

import { DetailsPanelComponent } from './details-panel.component';

@Injectable()
class PlayersServiceStub {

  getPlayer$():Observable<Player>{
    return of({
      name: 'Spizzirri, Damian',
      ELO: '1807',
      federation: 'Argentina',
      Byear: '1991'
    })
  }
}

describe('DetailsPanelComponent', () => {
  let component: DetailsPanelComponent;
  let fixture: ComponentFixture<DetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPanelComponent ],
      imports: [FormsModule],
      providers: [
        { provide: PlayersService, useClass: PlayersServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`shouldn't have an enabled input
      when the component is loaded`, ()=>{

      const inputElems = fixture.debugElement.queryAll(By.css('input'));
      const disabledInputElems = fixture.debugElement.queryAll(By.css('input[disabled]'));

      expect(inputElems).toEqual(disabledInputElems);
  })

  it(`should have a pair label-input tag inside of a section with each of these following texts:
      * Name * Federation * ELO * BYear
      when the component is loaded`, ()=>{

        const expectedPairs = ['Name', 'Federation', 'ELO', 'BYear'];

        expectedPairs.forEach( pair => {

          const labelElem = fixture.debugElement.query(By.css(`section label[for='${pair.toLowerCase()}']`));
          const inputElem = fixture.debugElement.query(By.css(`section input[id='${pair.toLowerCase()}']`));

          expect(inputElem).not.toBeNull();
          expect(labelElem).not.toBeNull();
          expect(labelElem.nativeElement.textContent.trim()).toBe(`${pair}:`);
        })
    })

    it(`should have four label and four input tags inside of a section`, ()=>{

      const labelElems = fixture.debugElement.queryAll(By.css(`section label`));
      const inputElems = fixture.debugElement.queryAll(By.css(`section input`));

      expect(labelElems).toHaveSize(4)
      expect(inputElems).toHaveSize(4)
    })
});
