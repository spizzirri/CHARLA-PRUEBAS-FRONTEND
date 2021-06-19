# Iteración 5

## Solo agreguemos un método mas, un initComponent

### ¿Con que problemas no fuimos encontrando en la iteración 2?.

En nuestro proyecto, al momento en el que estabamos trabajando en estas soluciones, teniamos la versión 9 del framework llamado Angular. Esto es importante porque la forma en la que nos estaba generando el codigo base para escribir las pruebas unitarias nos estaba generando un problema. 

### Contexto 

```js
  beforeEach(() => {
    // Crea el componente
    fixture = TestBed.createComponent(PlayersListComponent);
    // Obtiene la instancia de la clase
    component = fixture.componentInstance;
    // Actualiza / Refresca el DOM
    // La primera vez que se llama produce la ejecución del evento onInit.
    fixture.detectChanges();
  });
```

Este beforeEach lo que hace es instanciar el componente y refrescar/actualizar el HTML ( eso es lo que hace el metodo **detectChanges** )
En el caso particular de Angular, cuando ese metodo se ejecuta por primera vez, se invoca al evento **onInit** de Angular. 

### ¿Cual era el problema?

El problema que teniamos era que esa primera vez que se ejecuta el onInit y dado que queríamos tener los mocks de forma local,
necesitabamos que el primer detectChanges se ejecute despues.

### ¿Como reacciónamos? 

Decidimos eliminar ese beforeEach y crear una función global que se encargue de inicializar el componente luego de haber configurado las respuestas de cada servicio.