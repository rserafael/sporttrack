
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCorridaComponent } from './dashboard-corrida.component';

describe('DashboardCorridaComponent', () => {
  let component: DashboardCorridaComponent;
  let fixture: ComponentFixture<DashboardCorridaComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCorridaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
