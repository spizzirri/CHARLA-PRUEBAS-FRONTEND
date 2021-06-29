---
marp: true
---

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