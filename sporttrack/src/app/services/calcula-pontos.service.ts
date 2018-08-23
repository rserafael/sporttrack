import { Injectable } from '@angular/core';
import { URLBase } from '../const';
import { Dados } from '../model/dado';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculaPontosService {

  constructor() { }

  public getPontosParaEntidade(id: number): number{

    return 0;
  }
}
