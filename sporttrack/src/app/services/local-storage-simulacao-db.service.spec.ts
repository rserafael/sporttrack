import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageSimulacaoDBService } from './local-storage-simulacao-db.service';

describe('LocalStorageSimulacaoDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageSimulacaoDBService]
    });
  });

  it('should be created', inject([LocalStorageSimulacaoDBService], (service: LocalStorageSimulacaoDBService) => {
    expect(service).toBeTruthy();
  }));
});
