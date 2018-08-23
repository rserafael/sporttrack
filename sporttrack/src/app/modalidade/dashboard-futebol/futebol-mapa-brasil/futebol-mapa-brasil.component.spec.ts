import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutebolMapaBrasilComponent } from './futebol-mapa-brasil.component';

describe('FutebolMapaBrasilComponent', () => {
  let component: FutebolMapaBrasilComponent;
  let fixture: ComponentFixture<FutebolMapaBrasilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutebolMapaBrasilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutebolMapaBrasilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
