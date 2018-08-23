import {Entidade} from './entidade';
import {Simulacao} from './simulacao';

export class Investimento {
  constructor() {
    this.valor = 0;
  }

  id: number;
  entidade: Entidade;
  simulacao: Simulacao;
  valor: number;
}
