import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { URLBase } from '../const';
import { Dados } from '../model/dado';
import { Entidade } from '../model/entidade';
import { Variavel } from '../model/variavel';

@Injectable({
  providedIn: 'root'
})
export class DadosServiceService {

  constructor(private http: HttpClient) { }

  private urlBase: string = URLBase;

  public getListaDados(variavelid: number): Observable<Dados[]> {

    // Comentado para futura implementacao.
    // const headers      = new Headers({
    //   'Authorization': 'Bearer ' + this.globalvar.data,
    //   'Content-Type': 'application/json'
    // });
    // const options       = new RequestOptions({ headers : headers });

    return this.http.get<Dados[]>(URLBase + 'dados?variavelid=' + variavelid)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
  }

  public getListaDadosEntidadeVariavel(idEntidade: number, idVariavel: number): Observable<Dados[]> {

     return this.http.get<Dados[]>(URLBase + 'dados/ultimoanoentidade?variavelid=' + idVariavel + '&entidadeid=' + idEntidade)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));

  }

  public getListaDadosAtuaisEntidadeVariavel(idEntidade: number, idVariavel: number): Observable<Dados> {

    return this.http.get<Dados>(URLBase + 'dados/ultimo/entidade/var?variavelid=' + idVariavel + '&entidadeid=' + idEntidade)
   .pipe(
     tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));

 }

 public getListaDadosAtuaisEntidadeVariavelTodas(entidades: Entidade[], variaveis: Variavel[]): Observable<Dados[]> {

  var entityQuery = '';
  var variableQuery = '';

  entidades.forEach(entidade => entityQuery = entityQuery + '&entidades=' + entidade.id);
  variaveis.forEach(variavel => variableQuery = variableQuery + '&variaveis=' + variavel.id);

  return this.http.get<Dados[]>(URLBase + 'dados/ultimos/variaveis/entidades?' + variableQuery.substring(1, variableQuery.length) + entityQuery)
 .pipe(
   tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));

}

  public getListaDadosAtuais(variavelid: number): Observable<Dados[]> {

    // Comentado para futura implementacao.
    // const headers      = new Headers({
    //   'Authorization': 'Bearer ' + this.globalvar.data,
    //   'Content-Type': 'application/json'
    // });
    // const options       = new RequestOptions({ headers : headers });

    return this.http.get<Dados[]>(URLBase + 'dados/ultimos/var?variavelid=' + variavelid)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
  }

  public insere(dado: Dados): Observable<Dados> {
    const headers      = new HttpHeaders({
      'Authorization': 'Bearer ', // + this.globalvar.data,
      'Content-Type': 'application/json'
    });
    const options       =  { headers : headers};
    console.log('Passei por aqui')
    return this.http.put<Dados>(URLBase + 'dado', JSON.stringify(dado), options).pipe( tap(_ => console.log('dados ok')), catchError(this.handleError('dados service', null)));
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
