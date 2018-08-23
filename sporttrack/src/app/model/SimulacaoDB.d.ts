import { Simulacao } from './simulacao';
import { Usuario } from './usuario';

export interface SimulacaoDB {
    id: string;
    modalidade: number;
    transientUserid: number;
    simulacao: string;
}