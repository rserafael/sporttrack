
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoTabsTableVariaveisComponent } from './simulacao-tabs-table-variaveis.component';

describe('SimulacaoTabsTableVariaveisComponent', () => {
  let component: SimulacaoTabsTableVariaveisComponent;
  let fixture: ComponentFixture<SimulacaoTabsTableVariaveisComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacaoTabsTableVariaveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulacaoTabsTableVariaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
