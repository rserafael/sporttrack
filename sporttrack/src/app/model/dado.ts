export interface Dados {
  version: number;
  id: number;
  dataReferencia: number;
  dataAtualizacao: number;
  entidade: Entidade;
  variavelId?: number;
  valor: number;
}
export interface Entidade {
  version: number;
  id: number;
  nome: string;
  cidade: Cidade;
  contratos?: (ContratosEntity)[] | null;
  transientModalidadeId?: null;
  grupo: string;
  dataCriacao?: null;
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

