import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf, Subscription, Subject } from 'rxjs';
import { Municipio } from '../model/municipios';
import { Estado } from '../model/estado';


@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  private municipios: Municipio[];
  private estados: string[];
  private subscription: Subscription;
  private estados$ = new Subject<string>();
  entidadeInformada$ = this.estados$.asObservable();

  constructor(private http: HttpClient) { }

  getMunicipios(): Observable<Municipio[]>{
    return this.http.get<Municipio[]>("assets/listamunicipios/listamunicipios.json");
  }

}
