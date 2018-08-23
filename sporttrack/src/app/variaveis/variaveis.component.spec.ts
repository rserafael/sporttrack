
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariaveisComponent } from './variaveis.component';

describe('VariaveisComponent', () => {
  let component: VariaveisComponent;
  let fixture: ComponentFixture<VariaveisComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariaveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
