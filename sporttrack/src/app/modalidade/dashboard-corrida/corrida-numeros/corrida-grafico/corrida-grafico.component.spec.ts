import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaGraficoComponent } from './corrida-grafico.component';

describe('CorridaGraficoComponent', () => {
  let component: CorridaGraficoComponent;
  let fixture: ComponentFixture<CorridaGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
