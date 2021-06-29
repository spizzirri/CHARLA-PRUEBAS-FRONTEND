---
marp: true
---

```js
describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{ path: ':region', component: PlayersListComponent }]), 
                 FormsModule, SharedModule ],
      declarations: [ PlayersListComponent, FilterPipe ],
      providers: [
        { provide: PlayersService, useClass: PlayersServiceMock },
        { provide: ActivatedRoute, useValue: { 
            paramMap: of({ get(param:string){ return param ==="region"? 'arg': new Error("Wrong param") } })}
        }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
```