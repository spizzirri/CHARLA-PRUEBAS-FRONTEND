import { getTestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

export class ActivatedRouteSpy{

    private _activatedRoute: ActivatedRoute;

    constructor(){
        this._activatedRoute = getTestBed().inject(ActivatedRoute);
    }

    paramMap(){
        const service = this._activatedRoute;
        return {
            return: function (param:string){
                (<any>service).paramMap = of({ get(){ return param }})
            }
        }
        
    }
}