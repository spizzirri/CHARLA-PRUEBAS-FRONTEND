import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class ViewObject {
  private _fixture: ComponentFixture<any>;

  constructor(fixture:Type<any>) {
    this._fixture = TestBed.createComponent(fixture);
  }

  get fixture(): ComponentFixture<any> {
    return this._fixture;
  }

  updateView() {
    this._fixture.detectChanges();
  }

  isThereA(cssSelector:string):boolean{
    return this.getElement(cssSelector) !== null;
  }

  getElement(cssSelector: string): DebugElement {
    return this._fixture.debugElement.query(By.css(cssSelector));
  }

  getElements(cssSelector: string): DebugElement[] {
    return this._fixture.debugElement.queryAll(By.css(cssSelector));
  }

  getElementsByText(cssSelector:string, text:string){
    return this.getElements(cssSelector)
          .filter( e => e.nativeElement.textContent.includes(text))
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

  clickOnElement(cssSelector: string, element?:DebugElement) {
    if(element){
      element.query(By.css(cssSelector)).nativeElement.click();
    }else{
      this.getNativeElement(cssSelector).click();
    }
  }

  doubleClickOnElement(cssSelector: string) {
    this.triggerEvent(cssSelector, 'dblclick');
  }

  getText(cssSelector: string):string {
    const element = this.getNativeElement(cssSelector);
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA')
      return element.value.trim();
    return element.textContent.trim();
  }

  setText(cssSelector: string, text: string) {
    const element = this.getNativeElement(cssSelector);
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA')
      element.value = text;
    element.textContent = text;
    element.dispatchEvent(new Event('input'));
  }

  getCSSAttribute(element: DebugElement, attribute: string):string {
    return element.nativeElement.computedStyleMap().get(attribute).toString();
  }
}