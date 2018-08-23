import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageSimulacaoDBService } from '../../../services/local-storage-simulacao-db.service';
import { SharedinvestimentoService } from '../../../services/sharedinvestimento.service';
import { SimulacaoService } from '../../../services/simulacao.service';
import { Simulacao } from '../../../model/simulacao';
import { SimulacaoDB } from "../../../model/SimulacaoDB";
import { Usuario } from '../../../model/usuario';
import { User } from '../../../auth/user';
import { Entidade } from '../../../model/entidade';
import { Variavel } from '../../../model/variavel';
import { Dados } from '../../../model/dado';
import { DadosServiceService } from '../../../services/dados-service.service';
import * as Handsontable from 'handsontable-pro';
import { HotTableRegisterer } from '@handsontable-pro/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable, of, from, Subject } from 'rxjs';
import { tap, map, throttleTime, flatMap } from 'rxjs/operators';
import * as moment from 'moment';
import { cumulativeStdNormalProbability, mean, standardDeviation } from "simple-statistics";
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';


export interface CalculoItem {
  variavel: number;
  entidade: number;
  valor: number;
  peso: number;
  ponto: number;
}

export interface DadosParaPontos {
  valor: number;
  peso: number;
  ponto: number;
}


@Component({
  selector: 'app-simulacao-tabela',
  templateUrl: './simulacao-tabela.component.html',
  styleUrls: ['./simulacao-tabela.component.css']
})
export class SimulacaoTabelaComponent implements OnInit {

  private colHeaders: string[] = ['Entidade', 'Grupo', 'Pontos', 'Contrato', 'Investimento', 'Investimento proporcional', 'Desconto', 'Investimento simulado', 'Valor por ponto', 'Ágio', 'Pontos para Rateio', 'Agio Máximo'];
  private columns = [
    { readOnly: true }
    , { readOnly: true }
    , { readOnly: true, renderer: 'my.customerenderer' }
    , { readOnly: true, renderer: 'my.customerenderer' }
    , { readOnly: false, renderer: 'my.customerenderer' }
    , { readOnly: true, renderer: 'my.customerenderer' }
    , { readOnly: false, renderer: 'my.customerenderer' }
    , { readOnly: true, renderer: 'my.customerenderer' }
    , { readOnly: true, renderer: 'my.customerenderer' }
    , { readOnly: true, renderer: 'my.customerenderer' }
    , { readOnly: true }
    , { readOnly: true }
    ,
  ];

  private colWidths = [300, 150, 90, 150, 150, 230, 120, 230, 150, 150, 150, 150];
  private rowHeaders = false;
  private height = 500;
  private formulas = true;
  private licenseKey: '058f1-4498c-884d5-f4716-0b715';


  private topRows: number = 8;
  private entidades: Entidade[] = [];
  private variaveis: Variavel[] = [];
  private simulacao: Simulacao;
  private idSimulacaoParaEditar: string;
  private simulacaoParaEditar: Simulacao;
  private investimentoInformado: number;
  private saldo: number;
  private investimentoTotalPlanilha: number;
  private saldoNaoAlocado: number;
  private pontoMedio: number;
  private investimentoTotalSimulado: number;
  private totalDePontos: number;
  private hiddenRows = {
    rows: [0, 1, 2, 3, 4, 5, 6, 7],
    indicators: true
  };
  private hiddenColumns = {
    columns: [10, 11],
    indicators: true
  };

  private autoRowSize: { syncLimit: 300 };
  private minSpareRows: 500;

  private route$: Subscription;
  private data: any[];
  private hotInstance: string = 'hot';

  private simulacaoDB: SimulacaoDB;
  private usuario: Usuario;
  private rateioInformado: number;
  private atualizarInvestimentoInformado = true;

  private pontos = new Map<number, number>();
  private observer;
  private subscription: Subscription;
  private porra: CalculoItem[] = [];
  private buceta: Dados[] = [];

  private mode = 'indeterminate';
  private progress = 0;

  private exportButton: HTMLElement;

  @ViewChild('htContainer') htContainer: ElementRef;

  constructor(private route: ActivatedRoute,
    private hotRegisterer: HotTableRegisterer,
    private sharedinvestimentoService: SharedinvestimentoService,
    private cdr: ChangeDetectorRef,
    private simulacaoService: SimulacaoService,
    private router: Router,
    public dadosService: DadosServiceService,
  ) {  }


  ngOnInit() {

    (function (Handsontable) {


      function customRenderer(hotInstance, td, row, column, prop, value, cellProperties) {

        // Optionally include `BaseRenderer` which is responsible for adding/removing CSS classes to/from the table cells.
        Handsontable.renderers.BaseRenderer.apply(this, arguments);

        if (value != null && (column == 2)) {
          td.innerHTML = value.toLocaleString('pt');
        }

        if (value != null && (column == 3 || column == 4 || column == 5 || column == 7 || column == 8)) {
          td.innerHTML = value.toLocaleString('pt', { style: 'currency', currency: 'BRL' });

          if (column == 4) {
            td.innerHTML = value.toLocaleString('pt', { style: 'currency', currency: 'BRL' });

            if (typeof value === "number") {
              // do nothing. this is just a workaround for values different types
            } else if (typeof value === "string") {
              var newValue = +value;
              if (typeof newValue === "number")
                td.innerHTML = newValue.toLocaleString('pt', { style: 'currency', currency: 'BRL' });
            }
          }
        }

        if (value != null && (column == 6 || column == 9)) {

          var agio =  (parseFloat(value) * 100).toFixed(2);

          if (hotInstance.getDataAtCell(row, 11) == 0 || hotInstance.getDataAtCell(row, 11) > agio  ||  hotInstance.getDataAtCell(row, 11) == undefined){
            td.innerHTML = (parseFloat(value) * 100).toFixed(2) + "%";
          } else {
            td.innerHTML = (parseFloat(value) * 100).toFixed(2) + "%";
            if (column === 9) {
              td.style.color = 'red';
            }
          }
        }

        return td;

      }

      // Register an alias
      Handsontable.renderers.registerRenderer('my.customerenderer', customRenderer);

    })(Handsontable);

    this.subscription = this.sharedinvestimentoService.getSimulacao().subscribe(response => {

      // console.log(response);
      this.progress = 0;
      this.investimentoInformado = response.investimento;
      this.investimentoTotalPlanilha = response.investimentoTotalPlanilha;
      this.saldo = this.investimentoInformado - this.investimentoTotalPlanilha;
      this.atualizarInvestimentoInformado = response.investimentoInformadoSimulacao;

      if (response.rateioInformado == null) {
        this.rateioInformado = 0
      } else {
        this.rateioInformado = response.rateioInformado;
      }

      this.simulacaoParaEditar = response;
      this.saldoNaoAlocado = 0;
      this.data = [];

      let numOfEnt = this.simulacaoParaEditar.entidades.length;

      this.simulacaoParaEditar.entidades.forEach(ent => console.log(ent));

      if (this.atualizarInvestimentoInformado) {
        this.data = Handsontable.helper.createEmptySpreadsheetData((8 + numOfEnt), 11);
        this.simulacaoParaEditar.data = this.data;
      } else {
        this.data = response.data;
      }

      // Verificar se aumentou, diminuiu ou ficou inalterado o numero de entidades.
      // Agir de acordo...
      if (this.data.length < (8 + numOfEnt)) {
        //Aumentou o numero de entidades
        this.data.push(['', '', '', '', '', '', '', '', '', '', '']);
      } else if (this.data.length > (8 + numOfEnt)) {
        //Diminuiu o numero de entidades
        for (let i = 8; i < this.data.length; i++) {

          if (this.simulacaoParaEditar.entidades.map(ent => ent.nome).lastIndexOf(this.data[i][0]) == -1) {
            this.data.splice(i, 1);
            break;
          }
        }
      }

      this.variaveis = this.simulacaoParaEditar.variaveis;
      this.entidades = this.simulacaoParaEditar.entidades;
      var iteracoes = this.variaveis.length * this.entidades.length;
      var iteracao = 0;

      console.log('Carga plainlha...')
      var tempo = performance.now();

      this.dadosService.getListaDadosAtuaisEntidadeVariavelTodas(this.entidades, this.variaveis).subscribe(response => {

        console.log('Carga plainlha... FIM em ' + (performance.now() - tempo));
        this.buceta = response;
        this.porra = [];
        this.buceta.forEach(gozada => {
          let peso = 0;
          for (let variavel of this.variaveis) {
            if (gozada.variavelId == variavel.id) {
              peso = variavel.peso;
              break;
            }
          }
          this.porra.push({ 'variavel': gozada.variavelId, 'entidade': gozada.entidade.id, 'valor': gozada.valor, 'peso': peso, 'ponto': 0 })
        });
        this.porra.sort((l, r): number => {
          if (l.variavel < r.variavel) return -1;
          if (l.variavel > r.variavel) return 1;
          return 0;
        })

        this.atualizaPlanilha(this.simulacaoParaEditar);
        this.cdr.detectChanges();
      });
    });


  }

  calculaPontosDosDados(dadinhos: CalculoItem[]) {

    for (let variavel of this.variaveis) {
      let statisticsArray = [];
      dadinhos.filter(dadinho => dadinho.variavel == variavel.id).forEach(dadinho => statisticsArray.push(dadinho.valor));

      let media = 0;
      let std = 0;

      if (statisticsArray.length != 0) {
        media = mean(statisticsArray);
        std = standardDeviation(statisticsArray);
      }

      if (std == 0) {
        dadinhos.filter(dadinho => dadinho.variavel == variavel.id).forEach(dadinho => dadinho.ponto = 0);
      } else {
        dadinhos.filter(dadinho => dadinho.variavel == variavel.id).forEach(dadinho => dadinho.ponto = cumulativeStdNormalProbability((dadinho.valor - media) / std) * (dadinho.peso) * 100);
      }
    }

    this.pontos = new Map();

    for (let entidade of this.entidades) {
      let total = 0;
      dadinhos.filter(dadinho => dadinho.entidade == entidade.id).forEach(dadinho => total = total + dadinho.ponto);
      this.pontos.set(entidade.id, total);
    }
  }

  atualizaPlanilha(simulacaoEditar: Simulacao) {

    this.calculaPontosDosDados(this.porra);

    const hot = this.hotRegisterer.getInstance(this.hotInstance);

    var autoresize = hot.getPlugin('autoRowSize');
    autoresize.enablePlugin();

    var exportPlugin = hot.getPlugin('exportFile');
    this.exportButton = document.getElementById('export-file');
    this.exportButton.addEventListener('click', function () {
      exportPlugin.downloadFile('csv', { filename: 'simulacao_' + simulacaoEditar.id + '_[YYYY]-[MM]-[DD]' });
    });

    this.entidades = simulacaoEditar.entidades;
    this.variaveis = simulacaoEditar.variaveis;
    var sheetBottom = (this.topRows + this.entidades.length);

    //Inicialização das cinco primeiras linhas

    // // Verba - valor da verba total informada pelo usuario
    this.data[0][0] = 'Investimento informado';
    this.data[0][3] = this.investimentoInformado;

    // Saldo - seta o saldo inical para 1
    this.data[1][0] = "Saldo inicial";
    this.data[1][3] = this.investimentoInformado - this.investimentoTotalPlanilha;

    //Saldo não alocado - seta o saldo nao alocado para 1
    this.data[2][0] = "Saldo nao alocado";
    this.data[2][3] = 0;

    //Rateio - seta  valor do rateio para 0
    this.data[3][0] = "Rateio Informado";
    this.data[3][3] = this.rateioInformado;

    //Ponto Médio -  seta o ponto médio para 1
    this.data[4][0] = "Ponto medio";
    this.data[4][3] = 0;

    //Soma do Investimento Simulado - seta o valor para 1
    this.data[5][0] = "Investimento simulado";
    this.data[5][3] = 0;

    //Soma Pontos para rateio
    this.data[6][0] = "Pontos para rateio";
    this.data[6][3] = 0;

    //Soma Pontos para rateio
    this.data[7] = ["Totais", '', 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Preenche planilha com dados das entidades exceto as colunas cujo cálculo exige o somatório das linhas.
    for (let index = 0; index < this.entidades.length; index++) {

      this.progress = index / this.entidades.length * 100;
      console.log('Progress: ' + this.progress)

      var ponto = this.pontos.get(this.entidades[index].id); //this.recuperaPontos(this.pontos, index);
      var row = index + this.topRows;

      // Recuperamos o investimento informado e o desconto, pois quando se insere o primeiro elemento
      // de uma linha a Handsontable zera todas as demias celulas da linha.
      var invInformado = hot.getDataAtCell(row, 4);
      var desconto = hot.getDataAtCell(row, 6);

      if (invInformado == null) {
        invInformado = this.entidades[index].contratos[0].valor;
      }

      if (desconto == null) {
        desconto = 0;
      }

      // Coluna A - Nome da Entidade (read-only)
      this.data[row][0] = this.entidades[index].nome;

      // Coluna B - Grupo da Entidade (read-only)
      this.data[row][1] = this.entidades[index].grupo;

      // Coluna C - Pontos da Entidade (read-only)
      this.data[row][2] = ponto;
      this.data[7][2] = this.data[7][2] + ponto;

      //Coluna D - Contrato da Entidade (read-only)
      this.data[row][3] = this.entidades[index].contratos[0].valor;
      this.data[7][3] = this.data[7][3] + this.entidades[index].contratos[0].valor;

      // Coluna E - Valor de Contrato da Entidade  Informado pelo Usuario
      if (this.atualizarInvestimentoInformado) {
        this.data[row][4] = this.entidades[index].valorInvestimentoInformadoParaSimulacao
        this.data[7][4] = this.data[7][4] + this.entidades[index].valorInvestimentoInformadoParaSimulacao;
      } else {
        this.data[row][4] = invInformado
        this.data[7][4] = this.data[7][4] + +invInformado;
      }

      // Coluna G - Desconto Informado pelo usuário
      if (this.atualizarInvestimentoInformado) {
        this.data[row][6] = 0;
      } else {
        this.data[row][6] = desconto;
      }

      // Coluna K - Calculo dos pontos das entidades a ratear
      if ((this.data[row][4] === 0 || this.data[row][4] === '0') && (this.data[row][6] === 0 || this.data[row][6] === '0' )) {
        this.data[row][10] = this.data[row][2];
        this.data[7][10] = this.data[7][10] + this.data[row][2];
      } else {
        this.data[row][10] = 0;
      }

      // Coluna L - Ágio maximo por entidade
      // if (this.entidades[index].agioMax === undefined){
      //   this.data[row][11] = 40;
      // } else {
        this.data[row][11] = this.entidades[index].agioMax;
      // }

    }

    // Preenche planilha com dados das entidades somente as counas que precisam dos somatorios das linhas
    for (let index = 0; index < this.entidades.length; index++) {
      const row = index + this.topRows;

      // Coluna F - Investimento Proporcional (read-only)
      if (this.data[7][2] == 0) {
        this.data[row][5] = 0;
      } else {
        this.data[row][5] = this.data[row][2] / this.data[7][2] * this.data[0][3];
        this.data[7][5] = this.data[7][5] + this.data[row][5]
      }

      // Coluna H - Investimento Simulado
      if ((this.data[row][4] === 0 || this.data[row][4] === '0') && (this.data[row][6] === 0 || this.data[row][6] === '0' )) {
        this.data[row][7] = this.data[3][3] * (this.data[row][10] / this.data[7][10]);
        this.data[7][7] = this.data[7][7] + this.data[row][7];
      } else if ((this.data[row][4] === 0 || this.data[row][4] === '0') && ((this.data[row][6] !== 0) && (this.data[row][6] !== '0'))) {
        this.data[row][7] = this.data[row][5] * (1 - this.data[row][6]);
        this.data[7][7] = this.data[7][7] + this.data[row][7];
      } else if (this.data[row][4] !== 0 && this.data[row][4] !== '0') {
        this.data[row][7] = this.data[row][4] * (1 - this.data[row][6]);
        this.data[7][7] = this.data[7][7] + this.data[row][7];
      }

      // Coluna I - Valor por ponto (read-only)
      if (this.data[row][2] == 0) {
        this.data[row][8] = 0
      } else {
        this.data[row][8] = this.data[row][7] / this.data[row][2];
      }

      // Coluna J - Calculo do Agio (read-only)
      if (this.data[row][5] == 0) {
        this.data[row][9] = 0
      } else {
        this.data[row][9] = this.data[row][7] / this.data[row][5] - 1;
      }
    }

    //calcula saldo nao alocado
    this.data[2][3] = this.data[0][3] - this.data[7][7];

    //calcula do ponto medio nao alocado
    this.data[4][3] = this.data[7][7] / this.data[7][2];

    this.atualizarInvestimentoInformado = false;
    this.simulacaoParaEditar.investimentoInformadoSimulacao = false;

    this.saldoNaoAlocado = hot.getDataAtCell(2, 3);
    this.pontoMedio = hot.getDataAtCell(4, 3);
    this.investimentoTotalPlanilha = hot.getDataAtCell(7, 4);
    this.saldo = hot.getDataAtCell(1, 3);
    this.saldoNaoAlocado = hot.getDataAtCell(2, 3);
    this.pontoMedio = hot.getDataAtCell(4, 3);
    this.progress = 100;
    console.log('Progress: Fim!')
    this.cdr.detectChanges();
    hot.render();

  }

  ngOnDestroy() {
    if (this.route$) {
      this.route$.unsubscribe();
    }

    this.subscription.unsubscribe();
  }

  calculaInvestimentoProporcional(pontos: number): number {
    let investimentoProporcional = pontos / this.data[7][2] * this.data[0][3];
    return investimentoProporcional;
  }

  onSalvarSimulacao() {
    this.simulacaoParaEditar.data = this.data;
    this.simulacaoParaEditar.rateioInformado = this.rateioInformado;
    this.simulacaoParaEditar.investimento = this.investimentoInformado;
    this.simulacaoDB = { 'id': this.simulacaoParaEditar.titulo, 'modalidade': this.simulacaoParaEditar.modalidade, 'transientUserid': null, 'simulacao': JSON.stringify(this.simulacaoParaEditar) };

    this.usuario = JSON.parse(this.simulacaoParaEditar.usuario);

    this.simulacaoService.atualizarSimulacao(this.simulacaoDB).subscribe(response => {
      this.sharedinvestimentoService.clearSimulacao();
    });
    this.router.navigate(['/simulacoes', this.simulacaoDB.modalidade, this.usuario.email]);
  }

  onExportarSimulacao() {
    // const hot = this.hotRegisterer.getInstance(this.hotInstance);
    // var exportPlugin = hot.getPlugin('exportFile');
    // this.exportButton = document.getElementById('export-file');
    // this.exportButton.addEventListener('click', function () {
    //   exportPlugin.downloadFile('csv', { filename: 'simulacao' });
    // });
  }

  onAlterarInvestimentoInformado() {
    this.atualizaPlanilha(this.simulacaoParaEditar);
    this.simulacaoParaEditar.data = this.data;
    this.simulacaoParaEditar.rateioInformado = this.rateioInformado;
    this.simulacaoParaEditar.investimento = this.investimentoInformado;
    this.usuario = JSON.parse(this.simulacaoParaEditar.usuario);
    this.simulacaoDB = { 'id': this.simulacaoParaEditar.id, 'modalidade': this.simulacaoParaEditar.modalidade, 'transientUserid': null, 'simulacao': JSON.stringify(this.simulacaoParaEditar) };
  }

  onAlterarRateioInformado() {
    this.atualizaPlanilha(this.simulacaoParaEditar);
    this.simulacaoParaEditar.data = this.data;
    this.simulacaoParaEditar.rateioInformado = this.rateioInformado;
    this.simulacaoParaEditar.investimento = this.investimentoInformado;
    this.simulacaoDB = { 'id': this.simulacaoParaEditar.id, 'modalidade': this.simulacaoParaEditar.modalidade, 'transientUserid': null, 'simulacao': JSON.stringify(this.simulacaoParaEditar) };
    this.usuario = JSON.parse(this.simulacaoParaEditar.usuario);
    this.simulacaoService.atualizarSimulacao(this.simulacaoDB).subscribe(response => console.log(response));

  }

  onAfterChanges($event, ht) {
    const hot = this.hotRegisterer.getInstance(this.hotInstance);

    //Check datasource: loadData array is null, thus we return witout doing anything
    if ($event.params[1] == 'loadData') {
      return;
    }

    this.data[$event.params[0][0][0]][$event.params[0][0][1]] = $event.params[0][0][3];
    this.simulacaoParaEditar.data = this.data;
    this.atualizaPlanilha(this.simulacaoParaEditar);
  }

  onAfterRender($event) {

  }
}
