---
marp: true
---

```js
    it(`should show the message "☢ No players ☢"
        when all players are deleted`, ()=>{
     
        const step = new Step();

        step.givenTheComponentIsLoadedWithSamplePlayers();
        step.whenAllOfThePlayersAreDeleted();
        step.thenTheListIsEmpty();
        step.thenThereIsMessageThatSaysNoPlayers();
    })
```