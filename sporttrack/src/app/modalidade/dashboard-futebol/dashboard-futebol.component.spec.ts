
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFutebolComponent } from './dashboard-futebol.component';

describe('DashboardFutebolComponent', () => {
  let component: DashboardFutebolComponent;
  let fixture: ComponentFixture<DashboardFutebolComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFutebolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFutebolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
