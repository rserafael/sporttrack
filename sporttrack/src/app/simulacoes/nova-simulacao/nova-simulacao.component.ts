import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { MatTableDataSource} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { Entidade } from '../../model/entidade';
import { Variavel } from '../../model/variavel';
import { Simulacao } from '../../model/simulacao';
import { Usuario } from '../../model/usuario';
import { EntidadesServiceService } from '../../services/entidades-service.service';
import { VariaveisServiceService } from '../../services/variaveis-service.service';
import { LocalStorageSimulacaoDBService } from '../../services/local-storage-simulacao-db.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SimulacaoService } from '../../services/simulacao.service';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { Subscription } from 'rxjs';
import { SimulacaoDB } from "../../model/SimulacaoDB";


@Component({
  selector: 'app-nova-simulacao',
  templateUrl: './nova-simulacao.component.html',
  styleUrls: ['./nova-simulacao.component.css']
})
export class NovaSimulacaoComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;

  displayedColumnsForEntities = ['select', 'nome', 'cidade'];
  dataSourceForEntities: MatTableDataSource<Entidade>
  selectionForEntities = new SelectionModel<Entidade>(true, []);

  displayedColumnsForVariables = ['select', 'nome'];
  dataSourceForVariables: MatTableDataSource<Variavel>;
  selectionForVariables = new SelectionModel<Variavel>(true, []);

  displayedColumnsForSelectedEntities = ['nome', 'cidade', 'valor'];
  dataSourceForSelectedEntities:MatTableDataSource<Entidade>;

  displayedColumnsForSelectedVariables = ['nome', 'peso'];
  dataSourceForSelectedVariables:MatTableDataSource<Variavel>;

  investimento: number = 0;
  investimentoDistribuir: number = 0
  investimentoTotalPlanilha: number = 0;
  investimentoInformado: number = 0;

  private route$: Subscription;
  private modalidade: number;
  private usuario: Usuario;
  private simulacaoDB: SimulacaoDB;

  constructor(private _formBuilder: FormBuilder, 
              private entidadeService: EntidadesServiceService, 
              private variavelService: VariaveisServiceService, 
              private simulacaoDbService: LocalStorageSimulacaoDBService,
              private router: Router,
              private simulacaoService: SimulacaoService,
              private activatedRouter: ActivatedRoute,
              private usuarioService: UsuarioServiceService){}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    this.route$ = this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.modalidade = params['modalidade']; // cast to number
        console.log('Recebido pelo router EM NOVA SIMULACAO a modalidade: ' + this.modalidade);
        

        this.usuarioService.recuperarUsuarios().subscribe(response => {
          for (let user of response){
            if (user.email == params['user']){
              console.log('Recebido pelo router EM NOVA SIMULACAO o user: ' + params['user'] + ', cujo ID: ' + user.id);
              this.usuario = user;
              break;
            }
          }
        });
    });

    var data:Entidade[] = [];
    this.entidadeService.getListaEntidades(this.modalidade).subscribe(response => {
      data = response;

      this.dataSourceForEntities = new  MatTableDataSource<Entidade>(data);
    });

    var data1:Variavel[] = [];
    this.variavelService.getListaVariaveis(this.modalidade).subscribe(response => {
      data1 = response;

      this.dataSourceForVariables = new  MatTableDataSource<Variavel>(data1);
    });

    this.investimentoDistribuir = this.investimento;
  }

  isAllEntitiesSelected() {
    const numSelected = this.selectionForEntities.selected.length;
    const numRows = this.dataSourceForEntities.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleEntities() {

    this.isAllEntitiesSelected() ?
        this.selectionForEntities.clear() :
        this.dataSourceForEntities.data.forEach(row => {
          this.selectionForEntities.select(row);
        });       
  }

  fillSelectedEntities(){

    let selectedEnteties = [];
    this.investimentoDistribuir = 0;
    this.investimentoTotalPlanilha = 0;
       
    for (let selEnt of this.selectionForEntities.selected){
     if (typeof selEnt.contratos[0] == 'undefined'){
       continue;
     }
     selEnt.valorInvestimentoInformadoParaSimulacao = 0;
     selectedEnteties.push(selEnt);
     this.investimentoDistribuir -=  selEnt.valorInvestimentoInformadoParaSimulacao;
     this.investimentoTotalPlanilha += selEnt.valorInvestimentoInformadoParaSimulacao;
    }

    this.dataSourceForSelectedEntities = new MatTableDataSource<Entidade>(selectedEnteties);
  }

  isAllVariablesSelected() {
    const numSelected = this.selectionForVariables.selected.length;
    const numRows = this.dataSourceForVariables.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleVariables() {

    this.isAllVariablesSelected() ?
        this.selectionForVariables.clear() :
        this.dataSourceForVariables.data.forEach(row => {
          this.selectionForVariables.select(row);
        });       
  }

  fillSelectedVariables(){

    let selectedVariables = [];
    
    for (let selVar of this.selectionForVariables.selected){

      selectedVariables.push(selVar);
    }

    this.dataSourceForSelectedVariables = new MatTableDataSource<Variavel>(selectedVariables);
  }

  finalizarNovaSimulacao() {

    // var usuario: Usuario = {'id': this.userId, 'address': null, 'cidade': null, 'dataExclusao': null, 'dataInclusao': null, 'email': null, 'foto': null, 'nome': null, 'senha': null, 'sexo': null, 'telefone': null, 'tipo': null, 'userid': this.userId}

    let simulacao = {
      'id': this.firstFormGroup.get('titulo').value,
      'modalidade': this.modalidade,
      'usuario': JSON.stringify(this.usuario),
      'descricao': this.firstFormGroup.get('descricao').value,
      'dataCriacao': new Date(),
      'dataAtualizacao': new Date(),
      'entidades': this.dataSourceForSelectedEntities.data,
      'variaveis': this.dataSourceForSelectedVariables.data,
      'investimento': this.investimento,
      'investimentoTotalPlanilha': this.investimentoTotalPlanilha,
      'investimentoInformadoSimulacao': true,
      'data': new Array<any>(),
    };

    // this.simulacaoDbService.storeOnLocalStorage(simulacao);
    // console.log('Salva a simulacao: ' + this.firstFormGroup.get('titulo').value + ', ' +
    //             new Date() + ', ' + new Date() + ', ' +
    //             this.investimento + ', ' + this.investimentoTotalPlanilha);

    console.log('INVESTIMENTO TOTAL PLANILHA: ' +  this.investimentoTotalPlanilha);

    this.simulacaoDB = {'id': ''+0, 'modalidade': this.modalidade, 'transientUserid': this.usuario.id, 'simulacao': JSON.stringify(simulacao)};

    this.simulacaoService.salvarSimulacao(this.simulacaoDB).subscribe(response => {

      //falta validar erro para nao ir pra tela seguyinte.
      console.log('SIMULACAO SALVA NA BASE: ' + response);
      this.router.navigate(['/simulacao', this.modalidade, response, this.usuario.id]);
    });
    
    // console.log('PARA SALVAR A SIMULACAO E PRECISO UM USER ID: ' + this.usuario);

    // this.router.navigate(['/simulacao', this.modalidade, this.firstFormGroup.get('titulo').value, this.usuario.id]);
    // this.router.navigate(['/simulacao', this.modalidade, 1006, 1]);
  }

  submitChange(){

    let selectedEnteties = [];
    this.investimentoDistribuir = 0;
    this.investimentoTotalPlanilha = 0;
    this.investimentoDistribuir = this.investimento;
    for (let selEnt of this.selectionForEntities.selected){
      if (typeof selEnt.contratos[0] == 'undefined'){
        continue;
      }
      this.investimentoDistribuir -= selEnt.valorInvestimentoInformadoParaSimulacao;
      this.investimentoTotalPlanilha += selEnt.valorInvestimentoInformadoParaSimulacao;
    }
  }

}

