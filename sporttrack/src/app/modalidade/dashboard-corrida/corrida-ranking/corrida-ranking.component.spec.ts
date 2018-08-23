
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaRankingComponent } from './corrida-ranking.component';

describe('CorridaRankingComponent', () => {
  let component: CorridaRankingComponent;
  let fixture: ComponentFixture<CorridaRankingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorridaRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
