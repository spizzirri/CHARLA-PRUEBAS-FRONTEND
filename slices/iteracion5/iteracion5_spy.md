---
marp: true
---

```js
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

```