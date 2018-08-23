import { Component, OnDestroy, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import * as Handsontable from '../../../node_modules/handsontable-pro';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { DadosServiceService } from '../services/dados-service.service';
import { VariaveisServiceService } from '../services/variaveis-service.service';
import { EntidadesServiceService } from '../services/entidades-service.service';
import { Variavel } from '../model/variavel';
import { Entidade } from '../model/entidade';
import { Entidade as EntY } from '../model/dado';
import { Dados } from '../model/dado';
import { HotTableRegisterer } from '@handsontable-pro/angular';
import { cumulativeStdNormalProbability, mean, standardDeviation } from "simple-statistics";
import { SharedModalidadeService } from '../services/shared-modalidade.service';


@Component({
  selector: 'dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, OnDestroy {

  private idVariavelParaEditar: string = '';
  private variavelParaEditar: Variavel = null;

  private data: any[] = [[]];
  private colHeaders: string[] = ['Entidades', 'Pontos', 'Dado atual'];
  private rowHeaders: string[] = [];
  private settingsObj: Handsontable.GridSettings;
  private route$: Subscription;
  private columns: any[] = [
    { readOnly: true },
    { type: 'numeric', numericFormat: { pattern: '0,0.00' }, readOnly: true },
    { type: 'numeric', numericFormat: { pattern: '0,0.00' }, readOnly: true },
  ];
  private dados: Dados[] = [];
  private entidades: Entidade[] = [];
  private rowHeaderWidth = 300;
  private formulas = true;
  private height = 700;
  private licenseKey: '058f1-4498c-884d5-f4716-0b715';
  private novaVariavel: string;
  private columnSorting = false;
  private remainingHeaders: string[] = [];
  private DadosAlterados: Map<String, Dados> = new Map();


  constructor(private route: ActivatedRoute,
    private variavelService: VariaveisServiceService,
    private dadosService: DadosServiceService,
    private hotRegisterer: HotTableRegisterer,
    private ref: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private entidadeSerive: EntidadesServiceService, private modalidadeService: SharedModalidadeService,
    private router: Router) {

    console.log(modalidadeService.modalidadeid)

    //Contruir headers da tabela
    var fimIntervalo = moment('2017-01');
    var header = moment(new Date());

    while (header >= fimIntervalo) {
      this.colHeaders.push(header.format('MM-YYYY'));
      header.subtract(1, 'month');
      this.columns.push({ type: 'numeric', numericFormat: { pattern: '0,0.00' } });

    }

    this.route$ = this.route.params.subscribe(
      (params: Params) => {
        this.idVariavelParaEditar = params['id'];

        this.entidadeSerive.getListaEntidades(modalidadeService.modalidadeid).subscribe(response => {
          this.entidades = response;

          //Primeiro precisamos saber o número de entidades
          //  let numEntidades = 0;
          for (let i = 0; i < this.entidades.length; i++) {
            if (this.rowHeaders.indexOf(this.entidades[i].nome) < 0) {
              this.rowHeaders.push(this.entidades[i].nome);
              this.remainingHeaders.push(this.entidades[i].nome);
            }
          }

          this.variavelService.getVariavel(this.idVariavelParaEditar).subscribe(response => {

            if (response == null) {
              this.variavelParaEditar = { 'version': 0, 'id': 0, 'nome': this.idVariavelParaEditar, 'peso': 0, 'ordem': 0 };
            } else {
              this.variavelParaEditar = response;
            }

            this.dadosService.getListaDados(this.variavelParaEditar.id).subscribe(response => {

              if (response != null) {
                this.dados = response;
              }

              this.data = Handsontable.helper.createEmptySpreadsheetData(this.entidades.length, this.colHeaders.length);

              if (this.dados.length > 0) {
                // Preenche a tabela de dados
                console.log('Numero de dados: ' + this.dados.length);
                var rowIndex = -1;

                for (let i = 0; i < this.dados.length; i++) {

                  rowIndex = this.rowHeaders.indexOf(this.dados[i].entidade.nome);
                  // console.log('Row index: ' + rowIndex);

                  let colIndex = this.colHeaders.indexOf(moment.utc(this.dados[i].dataReferencia).format('MM-YYYY'));
                  var row = this.data[rowIndex];

                  row[0] = this.dados[i].entidade.nome;
                  row[1] = 0;

                  //Controle dos clubes sem contrato
                  var index = this.remainingHeaders.indexOf(this.dados[i].entidade.nome);
                  if (index >= 0) {
                    this.remainingHeaders.splice(index, 1);
                  }

                  for (let j = 3; j < this.colHeaders.length; j++) {

                    // Para inserir o dado na coluna correta
                    if (j == colIndex) {
                      row[j] = this.dados[i].valor;

                      // Verificar se trata-se do valor atual. Varrendo row...
                      for (let k = 3; k < row.length; k++) {
                        if (row[k] === '') {
                          continue;
                        }

                        if (k <= j) {
                          row[2] = row[k];
                          break;
                        }
                      }
                    }
                  }

                  this.data[rowIndex] = row;
                  // Clacula os pontos
                  this.calculaPontos();

                }
              }
              for (let i = 0; i < this.remainingHeaders.length; i++) {
                var rowNumber = this.rowHeaders.indexOf(this.remainingHeaders[i]);
                this.data[rowNumber][0] = this.remainingHeaders[i];
                this.data[rowNumber][1] = 0;
                this.data[rowNumber][2] = 0;
              }
              // console.log('Clubes sem contrato: ' + JSON.stringify(this.remainingHeaders));
            })
          })
        });
      });
  }


  ngOnInit() {
  }

  salvarVariavel() {
    console.log('Salvar variável funciona! ' + this.novaVariavel)
    this.variavelParaEditar = { 'version': 0, 'id': 0, 'nome': this.novaVariavel, 'peso': 0, 'ordem': 0 };
  }

  onAfterChange($event) {
    //A variavel $event recebe um objeto com uma propriedade params
    //O params é uma lista cujo primeiro elemento ( 0 ) é um outra lista com as posições da célula, o valor inicial e o valor modificado
    // Ou o elemento 0 do params pode ser uam lista contendo as listas com as informacoes de cada célula 
    console.log($event);
    var params = $event.params[0]
    if(typeof params[0] == "object"){
      for(var i = 0; i < params.length; i++){
        this.criarDado(params[i]);
      }
    }
    else{
      this.criarDado(params[0]);
    }
  }

  criarDado(edit){
    var editRow = edit[0];
    var editCol = edit[1];
    var editValue;
    if (edit[3] == '') {
      editValue = edit[3];
    } 
    else {
      editValue = +edit[3];
    }
    this.data[editRow][editCol] = editValue;
    var entidade: EntY;
    for (let entity of this.entidades) {
      if (entity.nome == this.data[edit[0]][0]) {
        entidade = {
          'id': entity.id, 'nome': entity.nome, 'cidade': entity.cidade
          , 'contratos': entity.contratos, 'grupo': entity.grupo
          , 'dataCriacao': entity.dataCriacao, 'version': 0, 'transientModalidadeId': null
        };
        break;
      }

    }

    let dd: string[] = this.colHeaders[edit[1]].split('-')
    dd[2] = '01';
    let dia = dd[1] + '-' + dd[0] + '-' + dd[2];
    var dado: Dados;

    if(editValue === ''){
      dado = {
        'entidade': entidade, 'dataReferencia': new Date(dia).getTime()
        , 'variavelId': this.variavelParaEditar.id, 'dataAtualizacao': null, 'id': null, 'valor': null, 'version': 0
      }
    }
    else{
      dado = {
        'entidade': entidade, 'dataReferencia': new Date(dia).getTime()
        , 'variavelId': this.variavelParaEditar.id, 'dataAtualizacao': null, 'id': null, 'valor': editValue, 'version': 0
      }
    }
    this.guardarDado(editRow, editCol, dado);
  }

  guardarDado(row, col, dado: Dados){
    var key  = `${row},${col}`;
    this.DadosAlterados.set(key, dado);
  }

  calculaPontos() {
    let mediaArray = new Array();

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][2] != '') {
        mediaArray.push(this.data[i][2]);
      }
    }

    let media = 0;
    let stdd = 0;

    if (mediaArray.length > 0) {
      media = mean(mediaArray);
      stdd = standardDeviation(mediaArray);
    }

    for (let i = 0; i < this.data.length; i++) {

      if (stdd != 0 && (this.data[i][2] != '')) {
        let cummulativeProb = cumulativeStdNormalProbability((this.data[i][2] - media) / stdd) * 100;
        if (isNaN(cummulativeProb)) {
          cummulativeProb = 0;
        }

        this.data[i][1] = cummulativeProb;

      } else {
        this.data[i][1] = 0;
      }

    }
  }

  atualizaPlanilha() {

    for (let i = 0; i < this.data.length; i++) {
      var row = this.data[i];
      for (let k = 3; k < row.length; k++) {
        if (row[k] === '') {
          continue;
        } else {
          this.data[i][2] = row[k];
          break;
        }
      }

      // console.log('row: ' + JSON.stringify(this.data[i]));
    }


    this.calculaPontos();
    // for (let i = 0; i < this.data.length; i++) {
    //   console.log('rowAtualizada: ' + JSON.stringify(this.data[i]));
    // }


  }

  salvarPlanilha() {
    for (let dado of this.dados) {
      // console.log('Salvando dado para: ' + dado.entidade.nome);
      // dado.entidade.contratos.forEach(cont => console.log('DATA: ' + cont.data + ', valor: ' + cont.valor))     
      this.dadosService.insere(dado).subscribe(response => console.log(response));
    }

    this.router.navigate(['/variaveis', this.modalidadeService.modalidadeid]);
  }

  cancelarAletracaoPlanilha() {
    this.router.navigate(['/variaveis', this.modalidadeService.modalidadeid]);
  }

  ngOnDestroy() {
    if (this.route$) {
      this.route$.unsubscribe();
    }
  }

  onAfterPaste($event) {
    console.log('PAste: 0: ' + JSON.stringify($event.params[0]));
    console.log('PAste: 1: ' + JSON.stringify($event.params[1]));

    var a = $event.params[0];
    for (let i = 0; i < a.length; i++) {
      var b = a[i];
      console.log(JSON.stringify(b))

      for (let j = 0; j < b.length; j++) {
        console.log('b: ' + b[j]);
      }
    }
  }
}
