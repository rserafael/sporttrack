import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaFichaTecnicaComponent } from './corrida-ficha-tecnica.component';

describe('CorridaFichaTecnicaComponent', () => {
  let component: CorridaFichaTecnicaComponent;
  let fixture: ComponentFixture<CorridaFichaTecnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaFichaTecnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
