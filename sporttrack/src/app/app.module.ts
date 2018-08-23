import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule, 
  MatMenuModule,
  MatSelectModule,
  MatOptionModule,
  MatDividerModule,
  MatTooltipModule,
  MatStepperModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatProgressBarModule,
} from '@angular/material';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { StorageServiceModule } from '../../node_modules/angular-webstorage-service';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainNavComponent} from './main-nav/main-nav.component';
import { VariaveisComponent } from './variaveis/variaveis.component';
import {Angular2FontawesomeModule} from 'angular2-fontawesome/angular2-fontawesome';
import {HomeComponent} from './home/home.component';
import {ModalidadeComponent} from './modalidade/modalidade.component';
import {SimulacoesComponent} from './simulacoes/simulacoes.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HttpClientModule} from '@angular/common/http';
import {CorridaComponent} from './modalidade/corrida/corrida.component';
import {FutebolComponent} from './modalidade/futebol/futebol.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import { DashboardFutebolComponent } from './modalidade/dashboard-futebol/dashboard-futebol.component';
import { DashboardCorridaComponent } from './modalidade/dashboard-corrida/dashboard-corrida.component';
import { CorridaRankingComponent } from './modalidade/dashboard-corrida/corrida-ranking/corrida-ranking.component';
import { FutebolRankingComponent } from './modalidade/dashboard-futebol/futebol-ranking/futebol-ranking.component';
import { CorridaNumerosComponent } from './modalidade/dashboard-corrida/corrida-numeros/corrida-numeros.component';
import { FutebolNumerosComponent } from './modalidade/dashboard-futebol/futebol-numeros/futebol-numeros.component';
import { FutebolMapaBrasilComponent } from './modalidade/dashboard-futebol/futebol-mapa-brasil/futebol-mapa-brasil.component';
import { CorridaMapaBrasilComponent } from './modalidade/dashboard-corrida/corrida-mapa-brasil/corrida-mapa-brasil.component';
import { FutebolFichaTecnicaComponent } from './modalidade/dashboard-futebol/futebol-ficha-tecnica/futebol-ficha-tecnica.component';
import { CorridaFichaTecnicaComponent } from './modalidade/dashboard-corrida/corrida-ficha-tecnica/corrida-ficha-tecnica.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { FutebolIndicadoresComponent } from './modalidade/dashboard-futebol/futebol-numeros/futebol-indicadores/futebol-indicadores.component';
import { FutebolGraficoComponent } from './modalidade/dashboard-futebol/futebol-numeros/futebol-grafico/futebol-grafico.component';
import { CorridaGraficoComponent } from './modalidade/dashboard-corrida/corrida-numeros/corrida-grafico/corrida-grafico.component';
import { CorridaIndicadoresComponent } from './modalidade/dashboard-corrida/corrida-numeros/corrida-indicadores/corrida-indicadores.component';
import { TesteComponent } from './teste/teste.component';
import { MomentModule } from 'angular2-moment/moment.module';
import { HotTableModule } from '@handsontable-pro/angular';
import { HotTableRegisterer } from '@handsontable-pro/angular';
import { DadosComponent } from './dados/dados.component';
import { NovaSimulacaoComponent } from './simulacoes/nova-simulacao/nova-simulacao.component';
import { SimulacaoComponent } from './simulacoes/simulacao/simulacao.component';
import { SimulacaoTabsComponent } from './simulacoes/simulacao/simulacao-tabs/simulacao-tabs.component';
import { SimulacaoTabelaComponent } from './simulacoes/simulacao/simulacao-tabela/simulacao-tabela.component';
import { SimulacaoTabsTableEntidadesComponent } from './simulacoes/simulacao/simulacao-tabs/simulacao-tabs-table-entidades/simulacao-tabs-table-entidades.component';
import { SimulacaoTabsTableVariaveisComponent } from './simulacoes/simulacao/simulacao-tabs/simulacao-tabs-table-variaveis/simulacao-tabs-table-variaveis.component';
import { VariaveisServiceService } from './services/variaveis-service.service';
import { DadosServiceService } from './services/dados-service.service';
import { NovaVariavelComponent } from './variaveis/nova-variavel/nova-variavel.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { EntidadeComponent } from './entidades/entidade/entidade.component';
import { ContratotableComponent } from './entidades/contratotable/contratotable.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { VariavelComponent } from './variaveis/variavel/variavel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    VariaveisComponent,
    HomeComponent,
    ModalidadeComponent,
    SimulacoesComponent,
    UsuariosComponent,
    FutebolComponent,
    CorridaComponent,
    BreadcrumbComponent,
    DashboardFutebolComponent,
    DashboardCorridaComponent,
    CorridaRankingComponent,
    FutebolRankingComponent,
    CorridaNumerosComponent,
    FutebolNumerosComponent,
    FutebolMapaBrasilComponent,
    CorridaMapaBrasilComponent,
    FutebolFichaTecnicaComponent,
    CorridaFichaTecnicaComponent,
    FutebolIndicadoresComponent,
    FutebolGraficoComponent,
    CorridaGraficoComponent,
    CorridaIndicadoresComponent,
    TesteComponent,
    DadosComponent,
    NovaSimulacaoComponent,
    SimulacaoComponent,
    SimulacaoTabsComponent,
    SimulacaoTabelaComponent,
    SimulacaoTabsTableEntidadesComponent,
    SimulacaoTabsTableVariaveisComponent,
    NovaVariavelComponent,
    EntidadesComponent,
    EntidadeComponent,
    ContratotableComponent,
    ResultadosComponent,
    UsuarioComponent,
    VariavelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    Angular2FontawesomeModule,
    MatMenuModule,
    AmChartsModule,
    MomentModule,
    HotTableModule.forRoot(),
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatTooltipModule,
    MatStepperModule,
    CurrencyMaskModule,
    MatTabsModule,
    StorageServiceModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  providers: [HotTableRegisterer, VariaveisServiceService, DadosServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
