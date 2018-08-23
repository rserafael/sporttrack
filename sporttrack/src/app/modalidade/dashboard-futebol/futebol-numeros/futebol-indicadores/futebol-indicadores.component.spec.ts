import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutebolIndicadoresComponent } from './futebol-indicadores.component';

describe('FutebolIndicadoresComponent', () => {
  let component: FutebolIndicadoresComponent;
  let fixture: ComponentFixture<FutebolIndicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutebolIndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutebolIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
