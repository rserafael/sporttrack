import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ResultadosDataSource } from './resultados-datasource';
import { Ponto } from '../model/ponto';
import * as moment from 'moment';
import { PontoService } from '../services/ponto.service';
import { ResultadosItem } from './resultados-datasource';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export interface resultadoMapItem {
  grupo: string;
  invetimento: number;
  pontos: number;
}

@Component({
  selector: 'resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ResultadosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['entidade', 'grupo', 'ptsPeso', 'investimento', 'invProporcional', 'valorPonto', 'agio'];

  selectedValue: string;
  meses: any[] = [];
  private pontos: Ponto[];
  private resultadosMap = new Map<string, resultadoMapItem>();
  private investimentoTotal = 0;
  private pontosTotal = 0;
  private resultados: ResultadosItem[] = [];
  private route$: Subscription;
  private modalidade: number;
  private spinnerColor: string = 'primary';
  private spinnerMode: string = 'indeterminate';
  private dataLoaded: boolean = false;

  constructor(private pontoSerive: PontoService, private activatedRouter: ActivatedRoute) { };

  ngOnInit() {

    // Meses de refeência
    let inicio = moment(new Date('2017-01-01')).add(1, 'day');
    let agora = moment(new Date());
    while (agora > inicio) {
      this.meses.push({ 'value': agora.format('YYYY-MM-01T00:00:00'), 'viewValue': agora.format('MM-YYYY') });
      agora = moment(agora).subtract(1, 'month');
    }

    // Default select
    this.selectedValue = this.meses[0].value;

    // Constroi o datasource
    this.buildDataSource(this.meses[0].value);
  }

  changeMesReferencia(value){
    console.log(value);
    this.buildDataSource(value);
  }

  buildDataSource(dataReferencia: string){

    this.resultados = [];
    this.resultadosMap = new Map<string, resultadoMapItem>();
    this.investimentoTotal= 0;
    this.pontosTotal = 0;

    this.route$ = this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.modalidade = params['id']; // cast to number
        
        this.pontoSerive.getPontosParaEntidadesParaMes(this.modalidade, dataReferencia).subscribe(response => {
          this.pontos = response;
          for (let ponto of this.pontos) {
            if (ponto.entidade.nome == 'Clube de Regatas do Flamengo'){
              console.log(ponto.entidade.nome + ', grupo: ' + ponto.entidade.grupo + ', variavel: ' + ponto.variavel.nome + ', pontos: ' + ponto.valor + ', peso: ' + ponto.variavel.peso);
            }
          
            if (this.resultadosMap.has(ponto.entidade.nome)) {
              var resultadoMapItem = this.resultadosMap.get(ponto.entidade.nome);
              resultadoMapItem.pontos += (ponto.valor * ponto.variavel.peso * 100);
              this.resultadosMap.set(ponto.entidade.nome, resultadoMapItem);
            } else {
              if (ponto.entidade.contratos.length > 0) {
                this.investimentoTotal += ponto.entidade.contratos[0].valor;
                this.resultadosMap.set(ponto.entidade.nome, { 'grupo': ponto.entidade.grupo, 'invetimento': ponto.entidade.contratos[0].valor, 'pontos': (ponto.valor * ponto.variavel.peso * 100) });
              } else {
                this.resultadosMap.set(ponto.entidade.nome, { 'grupo': ponto.entidade.grupo, 'invetimento': 0, 'pontos': (ponto.valor * ponto.variavel.peso * 100) });
              }
            }
    
            this.pontosTotal += (ponto.valor * ponto.variavel.peso * 100);
          }
    
          this.resultadosMap.forEach((k, v) => {
    
            if (k.invetimento != 0) {
              this.resultados.push({
                // 'entidade': v, 'grupo': k.grupo, 'ptsPeso': +k.pontos.toFixed(2)
                // , 'investimento': k.invetimento, 'invProporcional': +((k.pontos / this.pontosTotal) * this.investimentoTotal).toFixed(2), 'valorPonto': +(k.invetimento / k.pontos).toFixed(2)
                // , 'agio': +((k.invetimento / (k.pontos / this.pontosTotal * k.invetimento)) - 1).toFixed(2)
                'entidade': v, 'grupo': k.grupo, 'ptsPeso': +k.pontos.toFixed(2)
                , 'investimento': k.invetimento, 'invProporcional': +((k.pontos / this.pontosTotal) * this.investimentoTotal).toFixed(2), 'valorPonto': +(k.invetimento / k.pontos).toFixed(2)
                , 'agio': +((( k.invetimento /((k.pontos / this.pontosTotal) * this.investimentoTotal)) - 1) * 100).toFixed(2)
              });
            } else {
              this.resultados.push({
                'entidade': v, 'grupo': k.grupo, 'ptsPeso': +k.pontos.toFixed(2)
                , 'investimento': k.invetimento, 'invProporcional': 0.00, 'valorPonto': 0.00
                , 'agio': 0.00
              });
            }
          });
          this.dataLoaded = true;    
          this.dataSource = new ResultadosDataSource(this.paginator, this.sort, this.resultados);
        });
      });
  }

  onSearch(inputString) {
    console.log('Input string: ' + inputString);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
