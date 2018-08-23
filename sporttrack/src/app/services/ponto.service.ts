import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { URLBase } from '../const';
import { Ponto } from '../model/ponto';


@Injectable({
  providedIn: 'root'
})
export class PontoService {

  private urlBase: string = URLBase;

  constructor(private http: HttpClient) { }

  public getPontosParaEntidadeVariavel(idEntidade: number, idVariavel: number): Observable<Ponto[]> {

    return this.http.get<Ponto[]>(URLBase + 'pontos?variavelid=' + idVariavel + '&entidadeid=' + idEntidade)
   .pipe(
     tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
 }

 public getPontosParaEntidade(idEntidade: number): Observable<Ponto[]> {

  return this.http.get<Ponto[]>(URLBase + 'pontos/entidade?entidadeid=' + idEntidade)
 .pipe(
   tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
}

public getPontosParaEntidadesParaMes(modalidade: number, datareferencia): Observable<Ponto[]> {

  return this.http.get<Ponto[]>(URLBase + 'pontos/mes?modalidadeid=' + modalidade + '&datareferencia=' + datareferencia)
 .pipe(
   tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
}

public getPontosParaEntidadesParaPontoAtual(modalidade: number): Observable<Ponto[]> {

  return this.http.get<Ponto[]>(URLBase + 'pontos/entidades/ultimos?modalidadeid=' + modalidade)
 .pipe(
   tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
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
