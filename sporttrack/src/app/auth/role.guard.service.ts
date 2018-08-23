import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import {LoginserviceService} from "../services/loginservice.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public loginService: LoginserviceService,public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // decode the token to get its payload

    const expectedRole = route.data.expectedRole;
    if(this.loginService.loginResponse.tipoUsuario==='Administrador'){
      return true;
    }
    return false;


  }
}
