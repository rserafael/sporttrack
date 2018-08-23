
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacoesComponent } from './simulacoes.component';

describe('SimulacoesComponent', () => {
  let component: SimulacoesComponent;
  let fixture: ComponentFixture<SimulacoesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
