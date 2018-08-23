import { Entidade } from './entidade';

export interface Ponto {
    version: number;
    id: number;
    valor: number;
    variavel: Variavel;
    dataReferencia: number;
    entidade?: Entidade;
}
 
export interface Variavel {
    version: number;
    id: number;
    nome: string;
    peso: number;
    ordem?: null;
}
  