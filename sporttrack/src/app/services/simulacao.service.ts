import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Usuario} from '../model/usuario';
import { SimulacaoDB } from '../model/SimulacaoDB';
import {URLBase} from '../const';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoService {
s
  constructor(private http: HttpClient) { }

  public salvarSimulacao(simulacao: SimulacaoDB): Observable<any>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    console.log(JSON.stringify(simulacao));

    console.log("faz o post");
    const options       =  { headers : headers};
    return this.http.post(URLBase + 'simulacoesjson',  JSON.stringify(simulacao) , options).pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));

  }

  public atualizarSimulacao(simulacao: SimulacaoDB): Observable<any>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    const options       =  { headers : headers};
    return this.http.put(URLBase + 'simulacoesjson',  JSON.stringify(simulacao) , options).pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));

  }

  public getSimulacao(id: string): Observable<SimulacaoDB> {
    const headers      = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.get<SimulacaoDB>(URLBase + 'simulacoes?simulacao=' + id, options)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados', null)));

  }

  public getSimulacoesUsuario(userId: number): Observable<SimulacaoDB[]> {
    const headers      = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.get<SimulacaoDB[]>(URLBase + 'simulacoes/usuario?id=' + userId, options)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados', null)));

  }

  public removerSimulacao(id: number): Observable<number> {
    const headers      = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.delete<number>(URLBase + 'simulacoes?id=' + id, options)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados', null)));

  }



  private handleError<Dados> (operation = 'operation', result?: Dados) {
    return (error: Dados): Observable<Dados> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(operation + ' failed para a modalidade: ' + error);
  
      // Let the app keep running by returning an empty result.
      return of(result as Dados);
    };
  }
}
