---
marp: true
---

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      const playerServiceRef = getTestBed().inject(PlayersService);
      spyOn(playerServiceRef, 'getListBy').and.returnValue(of(getAListOfSamplePlayers()))
      const activatedRouteRef = getTestBed().inject(ActivatedRoute);
      //(<any>activatedRouteRef).paramMap = of({ get(){ return 'sampleRegion' }})
      activatedRouteRef.paramMap = of({ get(){ return 'sampleRegion' }})

      initComponent();

      while(viewObject.isThereA('tr')){
        viewObject.clickOnElement('tr td button')
        viewObject.updateView();
      }

      const rowsAfterDeletingElems = viewObject.getElements('tr');
      expect(rowsAfterDeletingElems).toHaveSize(0);

      const messageText = viewObject.getText('p');
      expect(messageText).toBe('☢ No players ☢');
    })
```