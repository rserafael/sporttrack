import { Injectable } from '@angular/core';
import {LoginResponse} from "../model/loginResponse";

@Injectable({
  providedIn: 'root'
})export class GlobalvarsService {

  constructor() { }

  public user: LoginResponse;
  public token: String;

}
