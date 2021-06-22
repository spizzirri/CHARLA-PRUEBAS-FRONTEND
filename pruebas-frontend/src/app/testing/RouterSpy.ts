import { getTestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

export class RouterSpy{

    private _router: Router;

    constructor(){
        this._router = getTestBed().inject(Router);
    }

    navigateByUrl(){
        const spy = spyOn(this._router, 'navigateByUrl');
        return {
            resolve: function(value:boolean){
                return spy.and.resolveTo(value);
            }
        }
    }
}