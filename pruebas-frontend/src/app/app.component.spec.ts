import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DetailsPanelComponent } from './shared/details-panel/details-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayersListComponent } from './players-list/players-list.component';
import { SharedModule } from './shared/share.module';
import { PlayersService } from './shared/services/players.service';
import { of } from 'rxjs';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { Injectable } from '@angular/core';

@Injectable()
class PlayersServiceMock extends PlayersService{
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

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{
          path: 'not-found',
          component: NotFoundComponent
        },
        {
          path: ':region',
          component: PlayersListComponent
        }]),
        SharedModule
      ],
      declarations: [
        AppComponent,
        DetailsPanelComponent,
        PlayersListComponent,
        FilterPipe
      ],
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should navigate to the "Not-Found" page
      when the url is "not-found"`, 
    waitForAsync(
      inject([Router, Location], (router: Router, location:Location)=>{

        router.navigateByUrl('not-found');
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/not-found');
          fixture.detectChanges();
        });
      })
    )
  )

  it(`shouldn't navigate to the "Not-Found page
      when the url is "arg""`, 
    waitForAsync(
      inject([Router, Location], (router: Router, location:Location)=>{

        router.navigateByUrl('arg');
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/arg');
        });
      })
    )
  )
});
