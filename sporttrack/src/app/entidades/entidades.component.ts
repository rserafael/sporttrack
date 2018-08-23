import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EntidadesDataSource } from './entidades-datasource';
import { EntidadesServiceService } from '../services/entidades-service.service';
import { CalculaPontosService } from '../services/calcula-pontos.service';
import { Entidade } from '../model/entidade';
import { Ponto } from '../model/ponto'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PontoService } from '../services/ponto.service';
import { Subscription } from 'rxjs';
import {isNullOrUndefined} from 'util';
import {GlobalvarsService} from "../services/globalvars.service";


export interface CadastroEntidade {
  id: number;
  nome: string;
  investimento: number;
  pontosComPeso: number;
  pontosSemPeso: number;
  data: Date;
  ativa: boolean;
}

@Component({
  selector: 'entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})

export class EntidadesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EntidadesDataSource;

  private entidades: CadastroEntidade[] = [];
  private entidadeSelecionada: Entidade;
  private controleIdContratos: number[] = [];
  private mapaPontos = new Map<number, {'com': number, 'sem': number}>();
  private pontos: Ponto[] = [];
  private route$: Subscription;
  private modalidade: number;
  public dataLoaded: boolean = false;
  public spinnerColor: string = 'primary';
  public spinnerMode: string = 'indeterminate';
  public admin:boolean;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['nome', 'investimento', 'pontos', 'pontosPeso', 'dataCriacao', 'ativa', 'acoes'];
  displayedColumns = ['nome', 'investimento', 'pontosSemPeso', 'pontosComPeso', 'data'];

  constructor(private entidadesService: EntidadesServiceService, private router: Router,
              private calculaPontosService: CalculaPontosService,
              private pontoSerice: PontoService,
              private activatedRouter: ActivatedRoute, private globals:GlobalvarsService) { }

  ngOnInit() {
    this.admin = this.globals.user.tipoUsuario === 'Administrador';


    this.route$ = this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.modalidade = params['id']; // cast to number
        console.log('Modalidade: ' + this.modalidade)

        this.pontoSerice.getPontosParaEntidadesParaPontoAtual(this.modalidade).subscribe(response => {
          this.pontos = response;

          for (let ponto of this.pontos){
            if (!this.mapaPontos.has(ponto.entidade.id)){
              this.mapaPontos.set(ponto.entidade.id, {'sem': (ponto.valor * 100), 'com': (ponto.valor * ponto.variavel.peso*100)});
            } else {
              var parcial = this.mapaPontos.get((ponto.entidade.id));
              this.mapaPontos.set(ponto.entidade.id, {'sem': (parcial.sem + ponto.valor * 100), 'com': (parcial.com + ponto.valor * ponto.variavel.peso*100)});
            }
          }

          this.entidadesService.getListaEntidades(this.modalidade).subscribe(response => {
            console.log('Corrida: ' + JSON.stringify(response))
            for (let entidade of response) {
              var cadastroEntidade;

              if (!this.mapaPontos.has(entidade.id)) {

                if (entidade.contratos.length === 0) {
                  cadastroEntidade = {
                    'id': entidade.id,
                    'nome': entidade.nome,
                    'investimento': 0,
                    'pontosComPeso': 0,
                    'pontosSemPeso': 0,
                    'data': new Date(),
                    'ativa': ''
                  };
                } else {
                  cadastroEntidade = {
                    'id': entidade.id,
                    'nome': entidade.nome,
                    'investimento': entidade.contratos[0].valor,
                    'pontosComPeso': 0,
                    'pontosSemPeso': 0,
                    'data': new Date(entidade.contratos[0].data),
                    'ativa': true
                  };

                }
                this.entidades.push(cadastroEntidade);

              } else {

              console.log('Sem: ' + this.mapaPontos.get(entidade.id).sem + ', Com: ' + this.mapaPontos.get(entidade.id).com);
              var valorSemPeso = this.mapaPontos.get(entidade.id).sem;
              var valorComPeso = this.mapaPontos.get(entidade.id).com;
              if (entidade.contratos.length == 0) {
                cadastroEntidade = {
                  'id': entidade.id,
                  'nome': entidade.nome,
                  'investimento': 0,
                  'pontosComPeso': valorComPeso.toFixed(2),
                  'pontosSemPeso': valorSemPeso.toFixed(2),
                  'data': new Date(),
                  'ativa': true
                };
              } else {
                cadastroEntidade = {
                  'id': entidade.id,
                  'nome': entidade.nome,
                  'investimento': entidade.contratos[0].valor,
                  'pontosComPeso': valorComPeso.toFixed(2),
                  'pontosSemPeso': valorSemPeso.toFixed(2),
                  'data': new Date(entidade.contratos[0].data),
                  'ativa': true
                };
                for (let i = 0; i < entidade.contratos.length; i++) {
                  this.controleIdContratos.push(entidade.contratos[i].id);
                }
              }
              this.entidades.push(cadastroEntidade);
            }
            }
            this.dataSource = new EntidadesDataSource(this.paginator, this.sort, this.entidades);
            this.dataLoaded = true;
          });
        });
      });
  }

  editarEntidade(nome: string) {
    this.entidadesService.getListaEntidades(this.modalidade).subscribe(response => {
      for (let entidade of response) {
        if (entidade.nome == nome) {
          this.entidadeSelecionada = entidade;
        }
      }
    });
  }

  deletarEntidade(nome: string) {
    console.log('Será deletada entidade: ' + nome);
    alert('Será deletada entidade: ' + nome);
  }

  criarEntidade() {
    console.log('Será criada nova entidade!');

    this.entidadeSelecionada = { "version": 0, "id": 0, "nome": "",
     "cidade": { "version": 0, "id": 0, "nome": "escolher",
     "estado": { "id": 0, "nome": "escolher" },
     "latitude": 0, "longitude": 0 },
     "contratos": [{ "version": 0, "id": 0, "valor": 10000, "data": Date.now()}],
     "transientModalidadeId": null, "grupo": ""};
  }

  salvarEntidade() {
    console.log('A entidade selecionada será salva: ' + JSON.stringify(this.entidadeSelecionada));
    if (isNullOrUndefined(this.entidadeSelecionada.id) || this.entidadeSelecionada.id === 0) {
      this.entidadeSelecionada.transientModalidadeId = this.modalidade;
      this.entidadesService.insereEntidade(this.entidadeSelecionada).subscribe(response => {console.log("entrou no subscribe")});
    } else {
      this.entidadesService.alteraEntidade(this.entidadeSelecionada).subscribe(response => {console.log("entrou no subscribe")});

    }
  }

  onSelect(row, indice) {
    console.log('Row' + JSON.stringify(row));
    var entidadeSelecCadastro: CadastroEntidade
    for (let index = 0; index < this.dataSource.data.length; index++) {
      if (this.dataSource.data[index].nome === row.nome) {
        entidadeSelecCadastro = this.dataSource.data[index];
      }
    }
    this.entidadesService.recuperaEntidade(entidadeSelecCadastro.id).subscribe(response => this.entidadeSelecionada = response );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
