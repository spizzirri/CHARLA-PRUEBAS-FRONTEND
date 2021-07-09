---
marp: true
---

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
      playersSpy.getListBy().return(getAListOfSamplePlayers());
      activatedRouteSpy.paramMap().return('sampleRegion');

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