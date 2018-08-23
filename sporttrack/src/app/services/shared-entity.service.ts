import { Injectable } from '@angular/core';
import { EntidadeVariavel } from '../model/entidadeVariavel';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedEntityService {

  // Observable string sources
  private informaEntidadeSource = new Subject<EntidadeVariavel>();
  private recebeEntidadeSource = new Subject<EntidadeVariavel>();

   // Observable string streams
   entidadeInformada$ = this.informaEntidadeSource.asObservable();
   entidadeRecebida$ = this.recebeEntidadeSource.asObservable();

  // sharedEntity: Entidade;

  constructor() { }

 // Service message commands
  informaEntidade(entidade: EntidadeVariavel) {
    this.informaEntidadeSource.next(entidade);
  }

  recebeEntidade(entidade: EntidadeVariavel) {
    this.recebeEntidadeSource.next(entidade);
  }
}
