import { TestBed, inject } from '@angular/core/testing';

import { VariaveisServiceService } from './variaveis-service.service';

describe('VariaveisServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariaveisServiceService]
    });
  });

  it('should be created', inject([VariaveisServiceService], (service: VariaveisServiceService) => {
    expect(service).toBeTruthy();
  }));
});
