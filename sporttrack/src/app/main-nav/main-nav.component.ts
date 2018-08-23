import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { SharedModalidadeService } from '../services/shared-modalidade.service';
import { Router } from '@angular/router';
import { User } from '../auth/user';
import { UsuarioServiceService } from '../services/usuario-service.service'

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styles: [
    `.angular-logo {
      margin: 0 4px 3px 0;
      height: 35px;
      vertical-align: middle;
  }
  .fill-remaining-space {
    flex: 1 1 auto;
  }
  `
  ]
})
export class MainNavComponent {

  private selectedModalidadeName: string;
  private selectedModalidade: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private modalidadeService: SharedModalidadeService,
    private router: Router,
    private userService: UsuarioServiceService) {

    this.modalidadeService.modalidadeInformada$.subscribe(response => {

      this.selectedModalidade = response;

      if (response == 1) {
        this.selectedModalidadeName = 'Futebol';
      } else if (response == 2) {
        this.selectedModalidadeName = 'Corrida';
      }
    });
  }

  isLoggedIn$: Observable<boolean>;
  loggedUser$: Subscription;
  user: User;
  nomeUsuario: string;

  ngOnInit() {
    this.nomeUsuario = '';
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.loggedUser$ = this.authService.userlogged$.subscribe(response => {
      this.user = response;

      this.userService.recuperarUsuarios().subscribe(response => {
        for (let usuario of response){
          console.log('LOG user: ' + this.user.userName)
          console.log('usuario.email: ' + this.user.userName)
          if (usuario.email == this.user.userName){
            this.nomeUsuario = usuario.nome;
            break;
          }
        }
      });
      console.log('LoggedUser: ' + this.user.userName);
    });
 }

  onLogout() {
    this.authService.logout();
  }

  navegarParaVariaveis($event) {
    this.router.navigate(['/variaveis', $event]);
  }

  navegarParaEntidades(selectedModalidade) {
    this.router.navigate(['/entidades', selectedModalidade]);
  }

  navegarParaResultados(selectedModalidade) {
    this.router.navigate(['/resultados', selectedModalidade]);
  }

  navegarParaSimulacao(selectedModalidade) {
    this.router.navigate(['/simulacoes', selectedModalidade, this.user.userName]);
  }

  navegarParaDashboard(selectedModalidade) {
    if (this.selectedModalidade == 1) {
      this.router.navigate(['/dashboardfutebol']);
    }
    else {
      this.router.navigate(['/dashboardcorrida']);
    }
  }

  resetarModalidade() {
    this.selectedModalidadeName = "";
  }

}
