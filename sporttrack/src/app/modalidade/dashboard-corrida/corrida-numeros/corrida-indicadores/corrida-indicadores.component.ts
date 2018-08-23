import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { SharedEntityService } from '../../../../services/shared-entity.service';
import { Entidade } from '../../../../model/entidade';
import { Variavel } from '../../../../model/variavel';
import { Ponto } from '../../../../model/ponto';
import * as moment from 'moment';
import { PontoService } from '../../../../services/ponto.service';
import { VariaveisServiceService } from '../../../../services/variaveis-service.service';

interface tilesInterface {
  cols: number;
  rows: number;
  indicador: string;
  valor: number;
  rank: number;
  color: string;
}

@Component({
  selector: 'app-corrida-indicadores',
  templateUrl: './corrida-indicadores.component.html',
  styleUrls: ['./corrida-indicadores.component.css']
})
export class CorridaIndicadoresComponent implements OnInit {

  private chart: AmChart;
  private entidade: Entidade;
  private variaveis: Map<number, any> = new Map<number, any>();
  private dataProvider = new Array<any>();
  private meses = new Array<any>();

  constructor(private AmCharts: AmChartsService,
    private sharedEntity: SharedEntityService,
    private pontoService: PontoService,
    private variavelService: VariaveisServiceService) { }

    ngAfterViewInit() {

      this.sharedEntity.entidadeInformada$.subscribe(ent => {
        this.entidade = ent.entidade;
  
        this.meses = [];
        this.variaveis = new Map<any, any>();
  
        this.pontoService.getPontosParaEntidade(this.entidade.id).subscribe(response => {
  
          var pontosParciais: Ponto[] = response;
          var pontoMeses:Map<any, any>;
          for (let ponto of pontosParciais) {
  
            if (!this.variaveis.has(ponto.variavel.id)) {
              this.variaveis.set(ponto.variavel.id, new Map<any, any>());
            }
  
            pontoMeses = this.variaveis.get(ponto.variavel.id);
            if (!pontoMeses.has(moment(new Date(ponto.dataReferencia)).add(1, 'day').format('YYYY/MM'))) {
              pontoMeses.set(moment(new Date(ponto.dataReferencia)).add(1, 'day').format('YYYY/MM'), (ponto.valor * ponto.variavel.peso * 100));
              this.variaveis.set(ponto.variavel.id, pontoMeses);
            }
          }
  
         
  
          for (let i = pontoMeses.size - 1; i >= 0; i--) {
            this.meses.push({ 'mes': moment(new Date()).subtract(i, 'month').format('YYYY/MM'), 'valor': 0 });
          }
  
  
          this.variaveis.forEach((value: any, key: any) => {           
            var i = 0;
            value.forEach((value: number, key: string) => {
              var mes = this.meses[i];
              var valor = mes.valor + value;
              this.meses[i] = { 'mes': mes.mes, 'valor': valor };
              i++;
            });
          });
         
          this.dataProvider = [];
          for (let mes of this.meses) {
            this.dataProvider.push({ "lineColor": "#b3dfe2", "category": mes.mes, "value": mes.valor });
          }
  
          this.chart = this.AmCharts.makeChart("corridasgrafico", {
            "type": "serial",
            "theme": "light",
            "hideCredits":true,
            "marginRight": 0,
            "categoryField": "category",
  
            "dataProvider": this.dataProvider,
            "graphs": [
              {
                "valueField": "value",
                "fillAlphas": 1.0,
                "fillColorsField": "lineColor",
                "bullet": "round",
                "balloonText": "[[category]]: <b>[[value]]</b>",
              }
            ],
          });
        });
      });
    }
  
    ngOnDestroy() {
      if (this.chart) {
        this.AmCharts.destroyChart(this.chart);
      }
    }

  ngOnInit() {
  }

}
