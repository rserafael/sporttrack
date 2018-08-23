import { Entidade } from '../model/entidade';

export interface RankingTable {
    variavel: number;
    nomeEntidade: string;
    valor: number;
    rank: number;
    entidade: Entidade;
}