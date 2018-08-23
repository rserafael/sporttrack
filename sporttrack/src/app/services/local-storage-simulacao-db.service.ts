import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { DataSource } from '@angular/cdk/table';
import { Observable, Subject } from 'rxjs';
import { Simulacao }  from '../model/simulacao';
import { Entidade }  from '../model/entidade';
import { Variavel }  from '../model/variavel';

// key that is used to access the data in local storage
const STORAGE_KEY = 'LOCAL_SIMULACAO_LIST';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageSimulacaoDBService {

  // Observable string sources
  private informaSimulacaoSource = new Subject<string>();
  private recebeSimulacaoSource = new Subject<string>();

   // Observable string streams
   simulacaoInformada$ = this.informaSimulacaoSource.asObservable();
   simulacaoRecebida$ = this.recebeSimulacaoSource.asObservable();

  simulacaoList = [];
  simulacaoParaEditar = '';

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  // public storeOnLocalStorage(simulacaoName: string, dataCriacao: Date, ultimaExecucao: Date, 
  //                             entidades: number, numVariaveis: number, investimento: number,
  //                             investimentoDistribuir: number,
  //                         ): void {
  //   //get array of tasks from local storage
  //   const currentSimulacaoList = this.storage.get(STORAGE_KEY) || [];
  //   // push new task to array
  //   currentSimulacaoList.push({
  //      id: simulacaoName,
  //      criacao: dataCriacao,
  //      execucao: ultimaExecucao,
  //      entidades: numEntidades,
  //      indicadores: numVariaveis,
  //      investimento: investimento,
  //      investimentoDistribuir: investimentoDistribuir

  //     //  entidadesDB: entidadesDataSource,
  //     //  variaveisDB: variaveisDataSource
  //   });
  //   // insert updated array to local storage
  //   this.storage.set(STORAGE_KEY, currentSimulacaoList);
  //   console.log(this.storage
  //      .get(STORAGE_KEY) || 'LocaL storage is empty');
  // }

  public storeOnLocalStorage(simulacao: Simulacao): void {
    //get array of tasks from local storage
    const currentSimulacaoList:Simulacao[] = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    currentSimulacaoList.push(simulacao);

    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentSimulacaoList);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public getOnLocalStorage(STORAGE_KEY): Array<any>{

    return this.storage.get(STORAGE_KEY) || [];
  }

  public getSimulacaoOnLocalStorage(id: string): Simulacao {

    const currentSimulacaoList: Simulacao[] = this.storage.get(STORAGE_KEY) || [];
    console.log('Get simulação: ' + id)

    var simulacao:Simulacao;
    currentSimulacaoList.forEach(element => {

      if (id == element.id){
        // console.log('Will return simulacao: ' + element.id);
        // console.log('simulacao investimento: ' + element.investimentoTotalPlanilha);
        simulacao = element;
      }
    });

    console.log('returned simulacao: ' + simulacao.id);

    return simulacao;
  }

  public deleteOnLocalStorage(id: string): Array<any>{

    const currentSimulacaoList: any[] = this.storage.get(STORAGE_KEY) || [];
    console.log('Deletar simulação: ' + id)

    let index = 0;
    let i = 0;  
    currentSimulacaoList.forEach(element => {

      if (id == element.id){
        index = i;
      }
      i++;
    });

    currentSimulacaoList.splice(index, 1);
    this.storage.set(STORAGE_KEY, currentSimulacaoList);

    return currentSimulacaoList;
  }

  // public setSimulacaoParaEditar(id: string): void {
  //   this.simulacaoParaEditar = id;
  // }

  // public getSimulacaoParaEditar(): string {
  //   return this.simulacaoParaEditar;
  // }

   // Service message commands
   informaSimulacaoParaEditar(id: string) {
    this.informaSimulacaoSource.next(id);
    console.log('Servico BD e informarei: ' + id)
  }

  recebeSimulacaoParaEditar(id: string) {
    this.recebeSimulacaoSource.next(id);
  }
}
