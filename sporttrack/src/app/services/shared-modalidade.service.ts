import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedModalidadeService {

  // Observable string sources
  public modalidadeid: number;
  private informaModalidadeSource = new Subject<number>();
  private recebeModalidadeSource = new Subject<number>();

  // Observable string streams
  modalidadeInformada$ = this.informaModalidadeSource.asObservable();
  modalidadeRecebida$ = this.recebeModalidadeSource.asObservable();

  // sharedEntity: Entidade;

  constructor() { }

  // Service message commands
  informaModalidade(modalidade: number) {
    this.informaModalidadeSource.next(modalidade);
  }

  recebeModalidade(modalidade: number) {
    this.recebeModalidadeSource.next(modalidade);
  }
}
