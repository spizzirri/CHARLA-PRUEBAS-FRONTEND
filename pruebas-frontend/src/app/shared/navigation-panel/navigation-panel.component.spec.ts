import { Component } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel.component';

@Component({
  template: '',
  selector: 'fake'
})
class FakeComponent{

}

describe('NavigationPanelComponent', () => {
  let component: NavigationPanelComponent;
  let fixture: ComponentFixture<NavigationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationPanelComponent ],
      imports: [RouterTestingModule.withRoutes([  {
        path: ':region',
        component: FakeComponent
      }])],
      providers:[Location]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have three navigation links: 
      ARGENTINA, THE AMERICAS and WORLD`, ()=>{

      const expectedTexts = ['ARGENTINA', 'THE AMERICAS', 'WORLD'];
      const aElements = fixture.debugElement.queryAll(By.css('nav li ul a'));
      const currentTexts = aElements.map( e => e.nativeElement.textContent.trim());

      expect(currentTexts).toEqual(expectedTexts);
  })

  it('should navigate to "/arg" when ARGENTINA is clicked', ()=>{

    const location = getTestBed().inject(Location);
    const argElement = fixture.debugElement.queryAll(By.css('nav li ul a'))[0];
    argElement.nativeElement.click();

    expect(argElement.nativeElement.textContent.trim()).toBe('ARGENTINA')
    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/arg');
    })
  })

  it('should navigate to "/ame" when THE AMERICAS is clicked', ()=>{

    const location = getTestBed().inject(Location);
    const argElement = fixture.debugElement.queryAll(By.css('nav li ul a'))[1];
    argElement.nativeElement.click();

    expect(argElement.nativeElement.textContent.trim()).toBe('THE AMERICAS')
    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/ame');
    })
  })

  it('should navigate to "/wrd" when WORLD is clicked', ()=>{

    const location = getTestBed().inject(Location);
    const argElement = fixture.debugElement.queryAll(By.css('nav li ul a'))[2];
    argElement.nativeElement.click();

    expect(argElement.nativeElement.textContent.trim()).toBe('WORLD')
    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/wrd');
    })
  })
});
