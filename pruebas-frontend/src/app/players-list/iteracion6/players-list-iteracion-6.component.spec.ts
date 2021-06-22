import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { PlayersService } from '../../shared/services/players.service';
import { SharedModule } from '../../shared/share.module';
import { PlayersServiceMock } from '../../testing/MockedClasses';
import { PlayersListComponent } from '../players-list.component';
import { Step } from './players-list-iteracion-6.component.spec.step';

describe('[Iteracion 6] - PlayersListComponent', () => {

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

  it(`should show just the player called "Pichot, Alan"
      when the word "Alan" is typped in the input filter box
       and there is not other row with the word "Alan"`, ()=>{

        const step = new Step();
        
        step.givenTheComponentIsLoadedWithThreeSamplePlayersWhereOneOfThemIsCalledAlanPichot();
        step.whenTheListIsFilteredByAlan();
        step.thenTheListJustShowsThePlayerAlan();
    })

    it(`shouldn't show the player called "Pichot, Alan"
        after the delete button is clicked`, ()=>{

        const step = new Step();
      
        step.givenTheComponentIsLoadedWithThreeSamplePlayersWhereOneOfThemIsCalledAlanPichot();
        step.whenThePlayerCalledAlanIsDeleted();
        step.thenTheListDoesNotShowThePlayerAlan();
    })

    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
        const step = new Step();

        step.givenTheComponentIsLoadedWithSamplePlayers();
        step.whenAllOfThePlayersAreDeleted();
        step.thenTheListIsEmpty();
        step.thenThereIsMessageThatSaysNoPlayers();
    })

  it(`should show "TOP 10 Players - WORLD" 
      when the url para is world`, ()=>{

        const step = new Step();

        step.givenTheComponentIsLoadedWithSamplePlayersAndTheRegionIsWorld();
        step.thenTheTitleShowsTOP10PlayersWorld();
  })

  it(`should redirect to "not-found"  
       when the service return an error`, ()=>{

      const step = new Step();

      const spies = step.givenTheComponentGetsASampleErrorRetrievingPlayers();
      step.thenTheComponentRedirectsToTheNotFoundPage(spies.navigateSpy);
  })

  it(`should show the message "☢ No players ☢"
      when the service return an empty list`, ()=>{

      const step = new Step();
      
      step.givenTheComponentIsLoadedWithAnEmptyList();
      step.thenThereIsMessageThatSaysNoPlayers();
  })

  it(`should show "TOP 10 Players - ARGENTINA" when the url param is argentina`, ()=>{
    
      const step = new Step();

      step.givenTheComponentIsLoadedWithSamplePlayersAndTheRegionIsArgentina();
      step.thenTheTitleShowsTOP10PlayersArgentina();
  })

  it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

      const step = new Step();
      
      step.givenTheComponentIsLoadedWithFourSamplePlayersWhereOneOfThemIsFromUSA();
      step.whenTheListIsFilteredByUSA();
      step.thenTheListJustShowsThePlayerFromUSA();
    })
});