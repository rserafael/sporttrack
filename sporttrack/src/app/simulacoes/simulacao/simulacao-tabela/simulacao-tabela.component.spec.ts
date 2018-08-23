import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoTabelaComponent } from './simulacao-tabela.component';

describe('SimulacaoTabelaComponent', () => {
  let component: SimulacaoTabelaComponent;
  let fixture: ComponentFixture<SimulacaoTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacaoTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacaoTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
