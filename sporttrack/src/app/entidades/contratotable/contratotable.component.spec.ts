
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratotableComponent } from './contratotable.component';

describe('ContratotableComponent', () => {
  let component: ContratotableComponent;
  let fixture: ComponentFixture<ContratotableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratotableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
