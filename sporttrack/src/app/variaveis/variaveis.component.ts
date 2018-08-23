import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VariaveisDataSource } from './variaveis-datasource';
import { Variavel } from '../model/variavel';
import { VariaveisServiceService } from '../services/variaveis-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedModalidadeService } from '../services/shared-modalidade.service';
import {CadastroEntidade} from '../entidades/entidades.component';
import {isNullOrUndefined} from "util";
import {GlobalvarsService} from "../services/globalvars.service";

@Component({
  selector: 'variaveis',
  templateUrl: './variaveis.component.html',
  styleUrls: ['./variaveis.component.css']
})
export class VariaveisComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: VariaveisDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'peso', 'acoes'];

  private variavelData: Variavel[] = [];
  private novaVariavel = '';
  private variavelParaEdicao: Variavel;
  private modalidade: number;
  private route$: Subscription;
  public dataLoaded = false;
  public spinnerColor = 'primary';
  public spinnerMode = 'indeterminate';
  public admin:boolean;



  constructor(private variavelService: VariaveisServiceService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private sharedModalidade: SharedModalidadeService, private globals: GlobalvarsService) {}

  ngOnInit() {

    this.route$ = this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.modalidade = params['id']; // cast to number
        console.log('Recebido pelo router em Modalidade o id: ' + this.modalidade);

        this.variavelService.getListaVariaveis(this.modalidade).subscribe(response => {
          this.variavelData = response;
          this.dataSource = new VariaveisDataSource(this.paginator, this.sort, this.variavelData);
          this.dataLoaded = true;
        });

      });
    this.admin = this.globals.user.tipoUsuario === 'Administrador';

  }

  criarVariavel() {
    this.variavelParaEdicao = {id: null, ordem: 1, peso: 0.0, nome: '', version: 1};
  }


  editarDadosVariavel(id: string) {
    this.router.navigate(['/dados', id]);
  }

  editarVariavel(id: string) {
    console.log('Editar variável ' + id + ' funciona!');
    for (const variavel of this.variavelData) {
      if (variavel.id == +id) {
        this.variavelParaEdicao = variavel;
        break;
      }
    }
  }

  deletarVariavel(id: string) {
    console.log('Deletar variável ' + id + ' funciona!');
  }

  onSelect(row, indice) {
    console.log(row);
    var varriavel: Variavel
    for (let index = 0; index < this.dataSource.data.length; index++){
      if (this.dataSource.data[index].nome == row.nome){
        varriavel = this.dataSource.data[index];
      }
    }

    this.variavelParaEdicao = varriavel;
  }

  salvarVariavel() {
    if (isNullOrUndefined(this.variavelParaEdicao.id)) {
      this.variavelService.insere(this.variavelParaEdicao).subscribe(response => {
          console.log('dentro do subscribe');
          this.variavelParaEdicao = null;
        }
      )
      ;
    } else {
      this.variavelService.edita(this.variavelParaEdicao).subscribe(response => {
          console.log('dentro do subscribe');
          this.variavelParaEdicao = null;
        }
      )
      ;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
