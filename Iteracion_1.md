# Iteración 1 

## Probando con Mocks globales

### ¿Con que problemas no fuimos encontrando en la iteración 0?.

En la iteración anterior, a medida que empezabamos a agregar mas pruebas, comenzamos a ver que muchas veces las respuestas de los mocks se nos empezaba a repetir. Se nos ocurrió entonces, que tal vez sea buena idea tener un mock global para cada servicio.

La sintaxis, para los que no estaban acostumbrados a este tipo de pruebas, se tornaba un poco engorrosa y necesitabamos pensar en algo para mejorar esa experiencia.

### Codigo ejemplo 1

Aca vemos como tenemos una clase Mock que va ser el reemplazo del servicio original PlayersService

```js
class PlayersServiceMock {
  getListBy(region:string){

    let response:any = {};

    switch(region){
      case "arg": 
        response = {
          region: "ARGENTINA",
          list:[
            {
              "name": "Pichot, Alan",
              "federation": "Argentina",
              "ELO": "2630",
              "Byear": "1998"
            },
            {
              "name": "Mareco, Sandro",
              "federation": "Argentina",
              "ELO": "2629",
              "Byear": "1987"
            },
            {
              "name": "Martin, Sandro",
              "federation": "Argentina",
              "ELO": "2629",
              "Byear": "1987"
            }
          ]
        }; break;

      case "wrd":
        response = {
          region: "WORLD",
          list:[
            {
              "name": "Carlsen, Magnus",
              "federation": "Norway",
              "ELO": "2847",
              "Byear": "1990"
            },
            {
                "name": "Caruana, Fabiano",
                "federation": "USA",
                "ELO": "2820",
                "Byear": "1992"
            },
            {
              "name": "Ding, Liren",
              "federation": "China",
              "ELO": "2799",
              "Byear": "1992"
            },
            {
              "name": "Nepomniachtchi, Ian",
              "federation": "Russia",
              "ELO": "2792",
              "Byear": "1990"
            }
          ]
        }; break;

      default: 
        response = new Array<Player>();
    }

    return of(response);
  }
}

describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;

  // Primer beforeEach, prepara el entorno para correr las pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Modulos que van a usar las pruebas
      imports: [
        RouterTestingModule.withRoutes([{
          path: ':region',
          component: PlayersListComponent
        }]), 
        FormsModule, 
        SharedModule],
      // Componentes y Pipes que van a usar las pruebas
      declarations: [ PlayersListComponent, FilterPipe ],
      // Servicios que van a usar las pruebas.
      // Se puede indicar el servicio original o un mock, como se muestra en estos casos.
      providers: [
        { provide: PlayersService, useClass: PlayersServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get(param:string){ 
                              return param ==="region"? 
                                'arg': 
                                new Error("[ActivatedRoute] Wrong param") } })
          }
        }
      ]
    })
    .compileComponents();
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
})
```
Este mock esta declarado de forma global y todos las pruebas sobre este componente se inicializan con el. Si bien se un caso sencillo ya se aprecia que le empezamos a poner logica al mock, porque no siempre queriamos que nos devuelva lo mismo. 

En casos mas complejos esto se volvia engorroso y terminabamos optando por pisar el mock internamente en cada prueba.

### Codigo ejemplo 2

Al momento de hacer esta prueba nos encontramos con otro problema, el servicio que nos detecta la url tambien esta mockeado globalmente (siempre devolvia 'arg'). Se tuvo que pisar el mock de forma local y encima re iniciar el componente llamando al ngOnInit() para tomar el nuevo valor.

```js
it(`should show just the players from "USA"
      when the word "USA" is typped in the input filter box
      and there is not other row with the word "USA"`, ()=>{

    const filterValue = "USA";

    // No tenemos bien resuelto este mock.
    // Debemos setear nuevamente un valor de retorno
    // E invocar nuevamente al ngOnInit. 
    const activatedRouteSpy = getTestBed().inject(ActivatedRoute);
    (activatedRouteSpy as any).paramMap = of({ 
                                            get(param:string){ 
                                                return param ==="region"? 
                                                        'wrd': 
                                                        new Error("[ActivatedRoute] Wrong param") } 
                                            })
    
    component.ngOnInit();
    fixture.detectChanges();

    const rowsBefore = fixture.debugElement.queryAll(By.css('tr'));
    const USARowsBefore = rowsBefore.filter( row => row.nativeElement.textContent.includes(filterValue))

    expect(rowsBefore.length).toBe(4);
    expect(USARowsBefore.length).toBe(1);

    const filterElement = fixture.debugElement.query(By.css('.filter-container input#filter'));
    filterElement.nativeElement.value = filterValue;
    filterElement.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const rowsAfter = fixture.debugElement.queryAll(By.css('tr'));
    const USARowsAfter = rowsAfter.filter( row => row.nativeElement.textContent.includes(filterValue))

    expect(rowsAfter.length).toBe(1);
    expect(USARowsAfter.length).toBe(1);
})
```