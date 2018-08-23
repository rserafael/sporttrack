import { Cidade } from "./entidade";

export class Usuario {
  id: number;
  dataInclusao: Date;
  dataExclusao?: Date;
  dataNascimento?: Date;
  telefone?: string;
  senha?: string;
  tipo?: string;
  nome?: string;
  email: string;
  foto?: string;
  address?: string;
  userid: number;
  sexo?: string;
  cidade?: Cidade;
}
