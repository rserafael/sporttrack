import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { SharedEntityService } from '../../../../services/shared-entity.service';
import { Entidade } from '../../../../model/entidade';
import { Variavel } from '../../../../model/variavel';
import { DadosServiceService } from '../../../../services/dados-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-futebol-grafico',
  templateUrl: './futebol-grafico.component.html',
  styleUrls: ['./futebol-grafico.component.css']
})
export class FutebolGraficoComponent implements OnInit {

  private chart: AmChart;
  private entidade: Entidade;
  private variavel: Variavel;
  private investimento: number = 0;
  private nome: string;
  private cidade: string;
  private uf: string;
  private dataProvider = new Array<any>();
  private meses = new Array<any>();

  constructor(private AmCharts: AmChartsService,
    private sharedEntity: SharedEntityService,
    private dadosService: DadosServiceService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.sharedEntity.entidadeInformada$.subscribe(ent => {
      this.entidade = ent.entidade;
      this.variavel = ent.variavel;

      if (this.variavel.id == 0) {
        return;
      }

      this.meses = new Array<any>();
      this.dataProvider = [];

      for (let i = 17; i >= 0; i--) {
        this.meses.push({ 'mes': moment(new Date()).subtract(i, 'month').format('YYYY/MM'), 'valor': 0 });
      }

      this.dadosService.getListaDadosEntidadeVariavel(this.entidade.id, this.variavel.id).subscribe(response => {

        for (let dado of response) {

          var diaRef = moment(new Date(dado.dataReferencia)).format('YYYY/MM');
          for (let j = 0; j < this.meses.length; j++) {
            if (diaRef == this.meses[j].mes) {
              this.meses[j] = { 'mes': this.meses[j].mes, 'valor': dado.valor };
              break;
            }
          }
        }


        for (let mes of this.meses) {
          this.dataProvider.push({ "lineColor": "#b3dfe2", "category": mes.mes, "value": mes.valor });
        }

        this.chart = this.AmCharts.makeChart("serialdivVAR", {
          "type": "serial",
          "theme": "light",
          "hideCredits":true,
          "marginRight": 0,
          "categoryField": "category",
          "autoResize":true,
          "precision":2,
          "categoryAxis": {
            "gridThickness": 0,
            "minorTickLength": 0

          },
          // "valueAxes":{
          //   "gridThickness":0
          // },

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

}
