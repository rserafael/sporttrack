import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaVariavelComponent } from './nova-variavel.component';

describe('NovaVariavelComponent', () => {
  let component: NovaVariavelComponent;
  let fixture: ComponentFixture<NovaVariavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaVariavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
