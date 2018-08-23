import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutebolNumerosComponent } from './futebol-numeros.component';

describe('FutebolNumerosComponent', () => {
  let component: FutebolNumerosComponent;
  let fixture: ComponentFixture<FutebolNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutebolNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutebolNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
