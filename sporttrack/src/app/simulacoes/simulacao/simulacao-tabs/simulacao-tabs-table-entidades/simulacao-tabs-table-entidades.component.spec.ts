
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoTabsTableEntidadesComponent } from './simulacao-tabs-table-entidades.component';

describe('SimulacaoTabsTableEntidadesComponent', () => {
  let component: SimulacaoTabsTableEntidadesComponent;
  let fixture: ComponentFixture<SimulacaoTabsTableEntidadesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacaoTabsTableEntidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulacaoTabsTableEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
