import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaNumerosComponent } from './corrida-numeros.component';

describe('CorridaNumerosComponent', () => {
  let component: CorridaNumerosComponent;
  let fixture: ComponentFixture<CorridaNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
