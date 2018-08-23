import { TestBed, inject } from '@angular/core/testing';

import { DadosServiceService } from './dados-service.service';

describe('DadosServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosServiceService]
    });
  });

  it('should be created', inject([DadosServiceService], (service: DadosServiceService) => {
    expect(service).toBeTruthy();
  }));
});
