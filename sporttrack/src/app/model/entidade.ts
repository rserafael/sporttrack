export interface Entidade {
  version: number;
  id: number;
  nome: string;
  cidade: Cidade;
  contratos?: (ContratosEntity | null)[] | null;
  transientModalidadeId?: number;
  grupo: string;
  dataCriacao?: null;
  valorInvestimentoInformadoParaSimulacao?: number;
  agioMax?: number;
}
export interface Cidade {
  version: number;
  id: number;
  nome: string;
  estado: Estado;
  latitude: number;
  longitude: number;
}
export interface Estado {
  id: number;
  nome: string;
}
export interface ContratosEntity {
  version: number;
  id: number;
  valor: number;
  data: number;
}
