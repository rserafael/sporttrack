import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Simulacao } from '../model/simulacao';

@Injectable({
  providedIn: 'root'
})
export class SharedinvestimentoService {

   // Observable number sources
   private enviaSource = new Subject<Simulacao>();
   private recebeSource = new Subject<Simulacao>();
 
    // Observable number streams
    simulacaoEnviado$ = this.enviaSource.asObservable();
    simulacaoRecebido$ = this.recebeSource.asObservable();

  constructor() { }

  enviaInvestimento(simulacao: Simulacao) {
    this.enviaSource.next(simulacao);
  }

  recebeInvestimento(simulacao: Simulacao) {
    this.recebeSource.next(simulacao);
  }

  clearSimulacao() {
    this.enviaSource.next(null);
    console.log('clearSimulacao         fasdfasdfa')
  }

  getSimulacao(): Observable<any>{
    return this.simulacaoEnviado$;
  }
}
