---
marp: true
---

```js
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