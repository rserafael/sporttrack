import { RankingTable } from './rankingTable';

export interface SharedEntidade {
    rankingTable: RankingTable;
    dadosCompartilhados: DadosCompartilhados[];
}

export interface DadosCompartilhados{
    data: Date;
    valor: number;
}
 