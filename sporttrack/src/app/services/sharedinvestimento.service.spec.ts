import { TestBed, inject } from '@angular/core/testing';

import { SharedinvestimentoService } from './sharedinvestimento.service';

describe('SharedinvestimentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedinvestimentoService]
    });
  });

  it('should be created', inject([SharedinvestimentoService], (service: SharedinvestimentoService) => {
    expect(service).toBeTruthy();
  }));
});
