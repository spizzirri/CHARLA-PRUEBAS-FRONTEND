# Iteración 0 

## Como hacer pruebas usando Angular y Jasmine.

Lo primero que debimos aprender / repasar fue como se realizan pruebas en un proyecto en Angular utilizando Jasmine. Algo importante para comprender correctamente el funcionamiento era tener presente el ciclo de vida de los componentes en Angular. 

Para graficar esto, refresquemos entonces que un componente en Angular está compuesto por tres elementos:
1. Un archivo *.html
2. Un archivo *.ts
3. Un archivo de estilos que puede ser *.css, *.scss, etc.

> Comúnmente a su vez, cada carpeta que contiene estos tres archivos que representan un componente, tiene un cuarto archivo para realizar pruebas unitarias sobre ese componente en particular.

Ahora que ya repasamos un poco qué elementos componen un componente, repasemos brevemente el ciclo de vida de un componente en Angular.

| Evento                  | Descripcion
| :---------------------- | :------------------------------------------------------------------------------ |
| constructor()           | Inicializar una instancia del componente, recibe las inyecciones de los servicios a utilizar |
| ngOnChanges()           | Se lanza cuando Angular establece o restablece las propiedades de entrada vinculadas a datos |
| ngOnInit()              | Se lanza para Inicializar la directiva o el componente después de que Angular muestre primero las propiedades enlazadas a datos y establezca las propiedades de entrada de la directiva o del componente.|
| ngDoCheck()             | Se lanza sobre los cambios que Angular no puede o no detectará por sí solo.|
| ngAfterContentInit()    | Se lanza después de que Angular proyecte contenido externo en la vista del componente o en la vista en la que se encuentra una directiva. |
| ngAfterContentChecked() | Se lanza después de que Angular verifique el contenido proyectado en la directiva o el componente. |
| ngAfterViewInit()       | Se lanza después de que Angular inicialice las vistas del componente y las vistas secundarias, o la vista que contiene la directiva. |
| ngAfterViewChecked()    | Responda después de que Angular verifique las vistas del componente y las vistas secundarias, o la vista que contiene la directiva.  |
| ngOnDestroy()           | Se lanza justo antes de que Angular destruya la directiva o el componente. Cancele la suscripción a Observables y desconecte los controladores de eventos para evitar pérdidas de memoria. |


Para finalizar revisemos entonces, como es la estructura de un archivo típico de pruebas unitarias en Angular usando Jasmine.


```js
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  /*  
    Este beforeEach tiene la responsabilidad de
    preparar el entorno para crear luego una instancia
    del componente.

    Aquí es donde se debe declarar que elementos van a ser
    necesarios para correr las pruebas, como ser:
    componente, pipes, directivas, servicios, modulos, etc. 
  */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  // Segundo beforeEach, se crea un instancia del componente a probar y se renderiza el DOM
  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    // Se renderiza / actualiza el DOM 
    // Cuando se ejecuta por primera vez se lanza el evento onInit de los componentes.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  ...................  
});
```