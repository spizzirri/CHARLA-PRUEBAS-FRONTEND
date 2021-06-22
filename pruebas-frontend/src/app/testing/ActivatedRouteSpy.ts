import { getTestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

export class ActivatedRouteSpy{

    private _activatedRoute: ActivatedRoute;

    constructor(){
        this._activatedRoute = getTestBed().inject(ActivatedRoute);
    }

    paramMap(param:string){
        (<any>this._activatedRoute).paramMap = of({ get(){ return param }})
    }
}