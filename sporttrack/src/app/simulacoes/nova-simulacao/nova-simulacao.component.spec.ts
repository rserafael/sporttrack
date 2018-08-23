import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSimulacaoComponent } from './nova-simulacao.component';

describe('NovaSimulacaoComponent', () => {
  let component: NovaSimulacaoComponent;
  let fixture: ComponentFixture<NovaSimulacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaSimulacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
