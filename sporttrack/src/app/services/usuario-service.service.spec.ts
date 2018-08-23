import { TestBed, inject } from '@angular/core/testing';

import { UsuarioServiceService } from './usuario-service.service';

describe('UsuarioServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioServiceService]
    });
  });

  it('should be created', inject([UsuarioServiceService], (service: UsuarioServiceService) => {
    expect(service).toBeTruthy();
  }));
});
