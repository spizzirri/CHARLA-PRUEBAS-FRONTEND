import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DetailsPanelComponent } from './shared/details-panel/details-panel.component';
import { NavigationPanelComponent } from './shared/navigation-panel/navigation-panel.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { PlayersService } from './shared/services/players.service';
import { SharedModule } from './shared/share.module';

@Component({
  selector: 'router-outlet',
  template: '<p>Fake Component</p>'
})
class PlayersListComponentSub{

}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'not-found',
          component: NotFoundComponent
        },
        {
          path: ':region',
          component: PlayersListComponentSub
        }]),
        SharedModule
      ],
      declarations: [
        AppComponent,
        NavigationPanelComponent,
        DetailsPanelComponent,
        PlayersListComponentSub,
        FilterPipe
      ],
      providers: [PlayersService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should be rendering the following components: 
       * 1 navigation, 
       * 1 panel 
       * 1 router-outlet  
      when the AppComponent is loaded"`, 
    ()=>{
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      const navbarElem = fixture.debugElement.queryAll(By.directive(NavigationPanelComponent));
      const detailsPanelElem = fixture.debugElement.queryAll(By.directive(DetailsPanelComponent));
      const routerOutletElem = fixture.debugElement.queryAll(By.directive(RouterOutlet));

      expect(navbarElem).toHaveSize(1);
      expect(detailsPanelElem).toHaveSize(1);
      expect(routerOutletElem).toHaveSize(1);
    }
  )

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
});
