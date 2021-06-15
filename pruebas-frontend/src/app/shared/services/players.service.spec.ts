import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable"', ()=>{

    const obs = service.getPlayer$();
    expect(obs).toBeInstanceOf(Observable)
  })

  it('should set next value when the "setPlayer" method is invoked', (done)=>{
    const obs = service.getPlayer$();
    obs.subscribe( e => { expect(e).toEqual({Byear: '', ELO: '', federation: '', name: ''}); done()})
    service.setPlayer({Byear: '', ELO: '', federation: '', name: ''})
  })
});
