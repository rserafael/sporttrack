import { TestBed, inject } from '@angular/core/testing';

import { PontoService } from './ponto.service';

describe('PontoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PontoService]
    });
  });

  it('should be created', inject([PontoService], (service: PontoService) => {
    expect(service).toBeTruthy();
  }));
});
