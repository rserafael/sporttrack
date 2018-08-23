import { TestBed, inject } from '@angular/core/testing';

import { CalculaPontosService } from './calcula-pontos.service';

describe('CalculaPontosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculaPontosService]
    });
  });

  it('should be created', inject([CalculaPontosService], (service: CalculaPontosService) => {
    expect(service).toBeTruthy();
  }));
});
