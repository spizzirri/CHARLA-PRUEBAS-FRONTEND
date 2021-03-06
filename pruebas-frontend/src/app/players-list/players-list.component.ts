import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  public textToFilter:string;
  public players:Array<Player>;
  public regionName:string | null;

  constructor(private playersService:PlayersService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {

    this.players = new Array<Player>();
    this.textToFilter = "";
    this.regionName = "";
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.paramMap
      .pipe(map(param => param.get('region')))
      .pipe(filter(region => region !== null))
      .subscribe(region => this.loadList(region))
  }

  loadList(region:string | null){
    if(region){
      this.playersSubscription = this.playersService
        .getListBy(region).subscribe(
            (players:any) => {
              this.players = players?.list ? [...players?.list] : [];
              this.regionName = region?.toUpperCase() || null;
            },
            _ => this.router.navigateByUrl("not-found"));
    }
  }

  deletePlayer(i:number, event: Event){

    this.players.splice(i, 1);
    // We need to genere a new instance to fire the pipe that is in the ngFor
    this.players = [...this.players];
    event.stopPropagation();
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
