import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaIndicadoresComponent } from './corrida-indicadores.component';

describe('CorridaIndicadoresComponent', () => {
  let component: CorridaIndicadoresComponent;
  let fixture: ComponentFixture<CorridaIndicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaIndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
