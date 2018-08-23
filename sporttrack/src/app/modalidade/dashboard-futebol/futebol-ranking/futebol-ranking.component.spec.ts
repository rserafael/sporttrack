
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutebolRankingComponent } from './futebol-ranking.component';

describe('FutebolRankingComponent', () => {
  let component: FutebolRankingComponent;
  let fixture: ComponentFixture<FutebolRankingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FutebolRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutebolRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
