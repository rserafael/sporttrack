import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutebolGraficoComponent } from './futebol-grafico.component';

describe('FutebolGraficoComponent', () => {
  let component: FutebolGraficoComponent;
  let fixture: ComponentFixture<FutebolGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutebolGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutebolGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
