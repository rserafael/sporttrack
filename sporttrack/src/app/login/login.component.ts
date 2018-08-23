import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { LoginserviceService } from '../services/loginservice.service';
import { LoginResponse } from '../model/loginResponse';
import { AuthService } from './../auth/auth.service';
import { User } from '../auth/user';
import {GlobalvarsService} from "../services/globalvars.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private email : string
  private password : string
  private lembrar: boolean = false;
  private formSubmitAttempt: boolean;
  private user: User;

  constructor(private router: Router, private loginService: LoginserviceService, private authService: AuthService, private globalVars: GlobalvarsService) { }

  ngOnInit() {
  }

  onChkChange(){
    this.lembrar = true;
    alert("Função não implementada.");
  }

  login() {
    this.user = new User();
    this.user.userName = this.email;
    this.user.password = this.password;

    if (this.email !== null  && this.password !== null) {

      this.loginService.login(this.email, this.password).subscribe(res => {

        if (res == null){
          alert("Email ou Password está incorreto.");
        } else {
          this.globalVars.user = res;
          // console.log('LOGIN: ' + JSON.stringify(res));
          this.authService.login(this.user);
        }
      });
    }else {
      alert("Invalid credentials");
    }
    this.formSubmitAttempt = true;
  }

}
