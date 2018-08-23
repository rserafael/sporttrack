import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalvarsService} from './globalvars.service';
import {Observable} from 'rxjs';
import {Usuario} from '../model/usuario';
import {URLBase} from '../const';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient, private globalvar: GlobalvarsService) { }


  public salvarEntidade(usuario: Usuario): Observable<any>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    console.log(JSON.stringify(usuario));

    console.log("faz o post");
    return this.http.post(URLBase + 'usuarios', JSON.stringify(usuario), {headers});

  }


  public recuperarUsuarios(): Observable<Usuario[]>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");


    console.log("faz o post");
    return this.http.get<Usuario[]>(URLBase + 'usuarios/modalidade', {headers});

  }

  alteraUsuario(usuario: Usuario): Observable<any>{
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    console.log(JSON.stringify(usuario));

    console.log("faz o post");
    return this.http.put(URLBase + 'usuario', JSON.stringify(usuario), {headers});

  }
}
