import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaMapaBrasilComponent } from './corrida-mapa-brasil.component';

describe('CorridaMapaBrasilComponent', () => {
  let component: CorridaMapaBrasilComponent;
  let fixture: ComponentFixture<CorridaMapaBrasilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaMapaBrasilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaMapaBrasilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
