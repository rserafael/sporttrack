import {Injectable} from '@angular/core';
import {GlobalvarsService} from './globalvars.service';
import {Entidade} from '../model/entidade';
import {Observable, of} from 'rxjs';
import {URLBase} from '../const';
import {catchError, tap} from 'rxjs/operators';
import {LoginResponse} from '../model/loginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})export class EntidadesServiceService {

  constructor(private http: HttpClient, private globalvar: GlobalvarsService) { }

  public getListaEntidades(modalidade: number): Observable<Entidade[]> {
    // const headers      = new Headers({
    //   'Authorization': 'Bearer ' + this.globalvar.data,
    //   'Content-Type': 'application/json'
    // });
    // const options       = new RequestOptions({ headers : headers });
    return this.http.get<Entidade[]>(URLBase + 'entidades?modalidade=' + modalidade)
    .pipe(
      tap(_ => console.log('dados ok')), catchError(this.handleError('dados', null)));
  }

  private handleError<Dados> (operation = 'entidade service', result?: Dados) {
    return (error: Dados): Observable<Dados> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log('${operation} failed para a modalidade: ${error.id}');

      // Let the app keep running by returning an empty result.
      return of(result as Dados);
    };
  }

  public insereEntidade(entidade: Entidade): Observable<any>{
    // const headers      = new Headers({
    //   'Authorization': 'Bearer ' + this.globalvar.data,
    //   'Content-Type': 'application/json'
    // });

    const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
    console.log(entidade)
    entidade.id = null;
    return this.http.post(URLBase + 'entidades', JSON.stringify(entidade), {headers});

  }

  public alteraEntidade(entidade: Entidade): Observable<any>{
    // const headers      = new Headers({
    //   'Authorization': 'Bearer ' + this.globalvar.data,
    //   'Content-Type': 'application/json'
    // });

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    console.log(entidade)
    return this.http.put(URLBase + 'entidades', JSON.stringify(entidade), {headers});

  }

  public recuperaEntidade(indice: number): Observable<Entidade> {
    // const headers      = new Headers({
    //   'Authorization': 'Bearer ' + this.globalvar.data,
    //   'Content-Type': 'application/json'
    // });

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Entidade>(URLBase + 'entidade?id=' + indice, {headers});
  }

  // public salvarEntidade(entidade: Entidade): Observable<any>{
  //   const headers = new HttpHeaders()
  //   .set("Content-Type", "application/json");
  //   console.log(JSON.stringify(entidade));
  //   entidade.transientModalidadeId = 1;
  //
  //   console.log("faz o post");
  //   return this.http.post(URLBase + 'entidades', JSON.stringify(entidade), {headers});
  //
  // }


}
