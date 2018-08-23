import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {GlobalvarsService} from './globalvars.service';
import {Entidade} from '../model/entidade';
import {URLBase} from '../const';
import {Contrato} from '../model/contrato';
import {Variavel} from '../model/variavel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VariaveisServiceService {

  constructor(private http: HttpClient, private globalvar: GlobalvarsService) { }

  public getListaVariaveis(modalidade): Observable<Variavel[]> {
    const headers      = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.get<Variavel[]>(URLBase + 'variaveis?modalidadeId=' + modalidade, options)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados', null)));
  }

  public getVariavel(idVariavel): Observable<Variavel> {
    const headers      = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.get<Variavel>(URLBase + 'variavel?id=' + idVariavel, options)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados', null)));
  }

  public insere(variavel: Variavel): Observable<Variavel> {
    const headers      = new HttpHeaders({
      'Authorization': 'Bearer ', // + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.post<Variavel>(URLBase + 'variaveis?modalidadeid=1', JSON.stringify(variavel), options);


  }

  public edita(variavel: Variavel): Observable<Variavel> {
    const headers      = new HttpHeaders({
      'Authorization': 'Bearer ', // + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    return this.http.put<Variavel>(URLBase + 'variavel', JSON.stringify(variavel), options);


  }

  private handleError<Variavel> (operation = 'variaveis service', result?: Variavel) {
    return (error: Variavel): Observable<Variavel> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log('${operation} failed para a modalidade: ${error.id}');

      // Let the app keep running by returning an empty result.
      return of(result as Variavel);
    };
  }

  // public salvarVariavel(variavel: Variavel): Observable<Response> {
  //   const headers      = new Headers({
  //     'Authorization': 'Bearer ' + this.globalvar.data,
  //     'Content-Type': 'application/json'
  //   });
  //   const options = new RequestOptions({ headers : headers });
  //   return this.http.post(URLBase + 'variaveis?modalidadeId=1', JSON.stringify(variavel), options);
  //
  // }



}
