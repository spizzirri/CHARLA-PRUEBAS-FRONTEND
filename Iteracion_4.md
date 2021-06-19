# Iteración 3

## Esto es muy engorroso de escribir, demasiado verboso.

### ¿Con que problemas no fuimos encontrando en la iteración 3?.

Afortunadamente, ya habíamos logrado superar la confusion que a veces se producia por mal interpretar con que datos se corrian los tests dado que ya no teniamos que ir a ver que datos globales tenia seteado un servicio, pero nos seguía faltando algo, mejorar la verbosidad del codigo para seleccionar elementos por ejemplo. **¡No puede ser que tengamos que escribir tantas lineas para dar un click!** Si lograbamos eso, tambien nos iba a ayudar a mejorar nuestra fluidez para escribir y la legibilidad. **Queríamos leer que se estaba probando**, no leer como lo hace y eso no lo estabamos consiguiendo.

### ¿Como reaccionamos?

Comenzamos a pensar en la idea de encapsular el codigo que necesita jasmine para interactuar con la vista, y asi fue como empezó a cobrar vida nuestra clase ViewObject. La realidad era que solo ibamos a necesitar una referencia a nuestro componente y desde ahi ya tendríamos acceso a todo lo necesario.


### ViewObject

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
```

### Codigo Ejemplo