import { TestBed, inject } from '@angular/core/testing';

import { SimulacaoService } from './simulacao.service';

describe('SimulacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulacaoService]
    });
  });

  it('should be created', inject([SimulacaoService], (service: SimulacaoService) => {
    expect(service).toBeTruthy();
  }));
});
