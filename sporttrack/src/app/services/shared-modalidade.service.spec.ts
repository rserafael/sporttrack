import { TestBed, inject } from '@angular/core/testing';

import { SharedModalidadeService } from './shared-modalidade.service';

describe('SharedModalidadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedModalidadeService]
    });
  });

  it('should be created', inject([SharedModalidadeService], (service: SharedModalidadeService) => {
    expect(service).toBeTruthy();
  }));
});
