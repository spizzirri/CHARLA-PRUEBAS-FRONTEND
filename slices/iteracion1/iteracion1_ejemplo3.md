---
marp: true
---

```js
  it(`should show "TOP 10 Players - ARGENTINA" when the url param is argentina`, ()=>{

    const h3Elem = fixture.debugElement.query(By.css('h3'));
    expect(h3Elem.nativeElement.textContent.trim()).toBe('TOP 10 Players - ARGENTINA');
  })
```