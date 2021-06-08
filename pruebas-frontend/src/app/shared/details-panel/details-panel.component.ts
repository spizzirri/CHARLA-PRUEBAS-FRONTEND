import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss']
})
export class DetailsPanelComponent implements OnInit, OnDestroy {

  private playersSubscription: Subscription = Subscription.EMPTY;
  public player:Player;

  constructor(private playersService:PlayersService) { 
    this.player = { Byear: "", ELO: "", federation: "", name: "" };
  }

  ngOnInit(): void {

    this.playersService.getPlayer$()
      .subscribe(player => this.player = player)
  }

  ngOnDestroy(){
    if(!this.playersSubscription.closed)
      this.playersSubscription.unsubscribe();
  }
}
