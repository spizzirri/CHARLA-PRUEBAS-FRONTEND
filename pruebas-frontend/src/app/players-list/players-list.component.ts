import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../models/player';
import { PlayersService } from '../shared/services/players.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit, OnDestroy {

  private playersSubscription: Subscription = Subscription.EMPTY;
  private activatedRouteSubscription: Subscription = Subscription.EMPTY;
  public players:Array<Player>;

  constructor(private playersService:PlayersService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {

    this.players = new Array<Player>();
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.paramMap
      .pipe(map(param => param.get('region')))
      .subscribe(region => this.loadList(region))
  }

  loadList(region:string | null){
    if(region){
      this.playersSubscription = this.playersService
        .getListBy(region).subscribe(
            (players:Array<Player>) => this.players = players,
            _ => this.router.navigateByUrl("not-found"));
    }else{
      this.router.navigateByUrl("not-found")
    }
  }

  setClickedPlayer(player:Player){
    this.playersService.setPlayer(player);
  }

  ngOnDestroy(){
    if(!this.playersSubscription.closed)
      this.playersSubscription.unsubscribe();
    if(!this.activatedRouteSubscription.closed)
      this.activatedRouteSubscription.unsubscribe();
  }
}
