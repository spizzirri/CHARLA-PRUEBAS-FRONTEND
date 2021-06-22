import { getTestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";
import { PlayersService } from "../shared/services/players.service";

export class PlayersSpy{

    private _playersService: PlayersService;

    constructor(){
        this._playersService = getTestBed().inject(PlayersService);
    }

    getListBy(){
        const spy = spyOn(this._playersService, 'getListBy');
        return {
            return: function(value:any){
                return spy.and.returnValue(of(value));
            },
            throw: function(error:Error){
                return spy.and.returnValue(throwError(error));
            }
        }
    }
}