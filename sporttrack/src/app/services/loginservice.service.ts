import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../model/loginResponse';
import { catchError, map, tap } from 'rxjs/operators';
import { URLBase } from '../const';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient) { }

  private urlBase: string = URLBase;

  public loginResponse: LoginResponse;

  login(login: string, senha: string): Observable<LoginResponse> {

    // Uncommnet for debugging
    // console.log(this.urlBase + 'authentication?user=' + login + '&password=' + senha);
    return this.http.get<LoginResponse>(this.urlBase + 'authentication?user=' + login + '&password=' + senha)
      .pipe(
        tap(evnt => {console.log('login ok');this.loginResponse= evnt;}), catchError(this.handleError('login', null)));
  }

  private handleError<ResponLoginResponsese> (operation = 'operation', result?: LoginResponse) {
    return (error: LoginResponse): Observable<LoginResponse> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log('${operation} failed: ${error.userid}');

      // Let the app keep running by returning an empty result.
      return of(result as LoginResponse);
    };
  }
}
