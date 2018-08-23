import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutebolFichaTecnicaComponent } from './futebol-ficha-tecnica.component';

describe('FutebolFichaTecnicaComponent', () => {
  let component: FutebolFichaTecnicaComponent;
  let fixture: ComponentFixture<FutebolFichaTecnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutebolFichaTecnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutebolFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
