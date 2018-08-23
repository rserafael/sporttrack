import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoTabsComponent } from './simulacao-tabs.component';

describe('SimulacaoTabsComponent', () => {
  let component: SimulacaoTabsComponent;
  let fixture: ComponentFixture<SimulacaoTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacaoTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacaoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
