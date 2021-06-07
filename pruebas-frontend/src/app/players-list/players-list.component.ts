import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../models/player';
import { PlayersService } from '../shared/services/players.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit, OnDestroy {

  private playersSubscription: Subscription = Subscription.EMPTY;
  public players:Array<Player>;

  constructor(private playersService:PlayersService) {
    this.players = new Array<Player>();
  }

  ngOnInit(): void {
    this.playersSubscription = this.playersService.getListBy("arg")
      .subscribe(
        (players:Array<Player>) => this.players = players
      );
  }


  ngOnDestroy(){
    if(!this.playersSubscription.closed)
      this.playersSubscription.unsubscribe();
  }
}
