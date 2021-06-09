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

  getElements(cssSelector: string): DebugElement[] {
    return this._fixture.debugElement.queryAll(By.css(cssSelector));
  }

  getNativeElement(cssSelector: string): any {
    return this._fixture.debugElement.query(By.css(cssSelector)).nativeElement;
  }

  getNativeElements(cssSelector: string): any[] {
    return this._fixture.debugElement
      .queryAll(By.css(cssSelector))
      .map(e => e.nativeElement);
  }

  triggerEvent(cssSelector: string, event:string) {
    this.getElement(cssSelector).triggerEventHandler(event, new MouseEvent(event));
  }

  clickOnElement(cssSelector: string) {
    this.getNativeElement(cssSelector).click();
  }

  doubleClickOnElement(cssSelector: string) {
    this.triggerEvent(cssSelector, 'dblclick');
  }

  getText(cssSelector: string) {
    const element = this.getNativeElement(cssSelector);
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA')
      return element.value;
    return element.textContent;
  }

  setText(cssSelector: string, text: string) {
    const element = this.getNativeElement(cssSelector);
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA')
      element.value = text;
    element.textContent = text;
  }

  getCSSAttribute(element: DebugElement, attribute: string) {
    return element.nativeElement.computedStyleMap().get(attribute).toString();
  }
}