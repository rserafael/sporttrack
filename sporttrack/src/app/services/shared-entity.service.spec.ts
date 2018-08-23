import { TestBed, inject } from '@angular/core/testing';

import { SharedEntityService } from './shared-entity.service';

describe('SharedEntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedEntityService]
    });
  });

  it('should be created', inject([SharedEntityService], (service: SharedEntityService) => {
    expect(service).toBeTruthy();
  }));
});
