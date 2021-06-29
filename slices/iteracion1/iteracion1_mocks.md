---
marp: true
---

```js
class PlayersServiceMock {
  getListBy(region:string){

    let response:any = {};

    switch(region){
      case "arg": 
        response = {
          region: "ARGENTINA",
          list:[ ... ]
        }; break;

      case "wrd":
        response = {
          region: "WORLD",
          list:[ ... ]
        }; break;

      default: 
        response = new Array<Player>();
    }

    return of(response);
  }
}
```