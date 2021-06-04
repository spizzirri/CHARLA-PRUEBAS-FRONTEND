# Iteración 2 

## Vuelta atrás, NO a los mocks globales

### ¿Con que problemas no fuimos encontrando en la iteración 1?.

Luego de haber experimentado con el hecho de utilizar mocks globales, que si bien nos parecía una buena idea, terminó pasando que en el dia a dia nos era muy dificil mantener un acuerdo sobre que conjunto de datos debería representar a ese mock global para un servicio particular. Lo que terminaba pasando, era que una vez que el archivo contenia varias pruebas ya perdia sentido este concepto, porque cada prueba era única y necesitaba, en muchas veces, una respuesta particular.

### ¿Como reaccionamos?

Lo que empezamos hacer, dado el problema que empezamos a ver, fue comenzar a declarar los mocks siempre en cada prueba sin utilizar el mock global. Eso además nos daba claridad, para saber exactamente con que datos se estaba ejecutando nuestra prueba sin necesidad de ir a buscar la definición global lo que lo hacía algo engorroso.


### Codigo Ejemplo