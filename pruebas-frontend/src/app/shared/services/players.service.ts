import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Player } from 'src/app/models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private regions:Array<string> = ["ame", "arg", "wrd"];
  private subject:Subject<Player>;

  constructor(private http:HttpClient) { 
    this.subject = new Subject<Player>();
  }

  getPlayer$():Observable<Player>{
    return this.subject.asObservable();
  }

  setPlayer(player:Player){
    this.subject.next(player);
  }

  getListBy(region:string):Observable<any>{

    if(this.regions.includes(region))
      return this.http.get(`assets/top-${region}-players.json`)
    else
      throw new Error("Invalid Region") 
  }


}
