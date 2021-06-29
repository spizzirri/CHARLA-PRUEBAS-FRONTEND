---
marp: true
---

```js
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class ViewObject {
  private _fixture: ComponentFixture<any>;

  constructor(fixture:ComponentFixture<any>) {
    this._fixture = fixture;
  }

  get fixture(): ComponentFixture<any> {
    return this._fixture;
  }

  updateView() {
    this._fixture.detectChanges();
  }

  getElement(cssSelector: string): DebugElement {
    return this._fixture.debugElement.query(By.css(cssSelector));
  }

  getNativeElement(cssSelector: string): any {
    return this._fixture.debugElement.query(By.css(cssSelector)).nativeElement;
  }

  clickOnElement(cssSelector: string) {
    this.getNativeElement(cssSelector).click();
  }
  ..........
}
```
