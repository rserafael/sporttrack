import { TestBed, inject } from '@angular/core/testing';

import { MunicipiosService } from './municipios.service';

describe('MunicipiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MunicipiosService]
    });
  });

  it('should be created', inject([MunicipiosService], (service: MunicipiosService) => {
    expect(service).toBeTruthy();
  }));
});
