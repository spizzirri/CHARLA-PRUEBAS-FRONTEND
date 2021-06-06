# Iteración 5

## Solo agreguemos un método mas, un initComponent

### ¿Con que problemas no fuimos encontrando en la iteración 4?.

En nuestro proyecto, al momento en el que estabamos trabajando en estas soluciones, teniamos la versión 9 del framework llamado Angular. Esto es importante porque la forma en la que nos estaba generando el codigo base para escribir las pruebas unitarias nos estaba generando un problema.

### Contexto 

```


```

Como podemos ver, existen dos beforeEach, el segundo lo que hace es instanciar el componente y refrescar/actualizar el HTML ( eso es lo que hace el metodo **detectChanges** )
En el caso particular de Angular, cuando ese metodo se ejecuta por primera vez, se invoca al evento **onInit** de Angular. 

### ¿Cual era el problema?

El problema que teniamos era que esa primera vez que se ejecuta el onInit, como teniamos ya los mocks por prueba unitaria y no globales, los servicios no tomaban los valores correctos la primera vez que corrian. Debiamos invocar al metodo onInit otra vez en cada prueba y eso  no siempre era una buena opción dependiendo de la prueba. 

### ¿Como reacciónamos? 

Decidimos eliminar ese beforeEach y crear una función global que se encargue de inicializar el componente luego de haber configurado las respuestas de cada servicio.

> Afortunadamente esto ultimo lo han modificado en la versión 12 de Angular, ese diabólico beforeEach ya no existe. 