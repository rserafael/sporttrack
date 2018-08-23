import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { VariaveisComponent } from './variaveis/variaveis.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardFutebolComponent } from './modalidade/dashboard-futebol/dashboard-futebol.component';
import { DashboardCorridaComponent } from './modalidade/dashboard-corrida/dashboard-corrida.component';
import { FutebolFichaTecnicaComponent } from './modalidade/dashboard-futebol/futebol-ficha-tecnica/futebol-ficha-tecnica.component'
import { NovaSimulacaoComponent } from '../app/simulacoes/nova-simulacao/nova-simulacao.component';
import { SimulacaoComponent } from '../app/simulacoes/simulacao/simulacao.component';

import { ModalidadeComponent } from './modalidade/modalidade.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { SimulacoesComponent } from './simulacoes/simulacoes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DadosComponent } from './dados/dados.component';
import { NovaVariavelComponent } from '../app/variaveis/nova-variavel/nova-variavel.component'
import {RoleGuardService} from "./auth/role.guard.service";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'variaveis/:id', component: VariaveisComponent, canActivate: [AuthGuard], data: {
      breadcrumb: "Variáveis"
    }
  },
  {
    path: 'modalidades', component: ModalidadeComponent, canActivate: [AuthGuard], data: {
      breadcrumb: "Modalidades"
    }
  },
  {
      path: 'entidades/:id', component: EntidadesComponent, canActivate: [AuthGuard], data: {
      breadcrumb: "Entidade"
    }
  },
  {
    path: 'resultados/:id', component: ResultadosComponent, canActivate: [AuthGuard], data: {
      breadcrumb: "Resultados"
    }
  },
  {
    path: 'simulacoes/:modalidade/:user', component: SimulacoesComponent, canActivate: [AuthGuard],
  },
  {
    path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: {
      breadcrumb: "Usuários",
    }
  },
  {
    path: 'dashboardfutebol', component: DashboardFutebolComponent, canActivate: [AuthGuard], data: {
      breadcrumb: "Dashboard Futebol", children: [
        {
          path: 'futebolfichatecnica', component: FutebolFichaTecnicaComponent, canActivate: [AuthGuard], data: {
            breadcrumb: "Ficha Técnica Futebol"
          }
        }],
    }
  },
  {
    path: 'dashboardcorrida', component: DashboardCorridaComponent, canActivate: [AuthGuard ], data: {
      breadcrumb: "Dashboard Corrida"
    }
  },
  {
    path: 'dados/:id', component: DadosComponent, canActivate: [AuthGuard,RoleGuardService], data: {
      breadcrumb: "Dados "
    }
  },
  { path: 'novasimulacao/:modalidade/:user', component: NovaSimulacaoComponent, canActivate: [AuthGuard] },
  { path: 'simulacao/:modalidade/:id/:user', component: SimulacaoComponent, canActivate: [AuthGuard] },
  { path: 'novavariavel', component: NovaVariavelComponent, canActivate: [AuthGuard] },
];

@NgModule({
  exports: [RouterModule],

  imports: [
    RouterModule.forRoot(routes)
  ],

  declarations: []
})

export class AppRoutingModule { }
