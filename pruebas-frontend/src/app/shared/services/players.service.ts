import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http:HttpClient) { }

  private regions:Array<string> = ["ame", "arg", "wrd"]

  getListBy(region:string):Observable<any>{

    if(this.regions.includes(region))
      return this.http.get(`assets/top-${region}-players.json`)
    else
      throw new Error("Invalid Region") 
  }
}
