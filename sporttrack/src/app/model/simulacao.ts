import { Entidade } from './entidade';
import { Variavel } from './variavel';
import { Investimento } from './investimento';
import { Peso } from './Peso';


export class Simulacao {
  id: string;
  titulo: string;
  modalidade: number;
  usuario: string;
  descricao: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  entidades: Entidade[];
  variaveis: Variavel[];
  investimento: number;
  investimentoTotalPlanilha: number;
  rateioInformado?: number;
  investimentoInformadoSimulacao: boolean
  data: any[];
  rateio: number;
}
