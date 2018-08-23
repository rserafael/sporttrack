import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { EntidadesServiceService } from '../../../services/entidades-service.service';
import { SharedEntityService } from '../../../services/shared-entity.service';
import { Entidade } from '../../../model/entidade';

@Component({
  selector: 'app-futebol-mapa-brasil',
  templateUrl: './futebol-mapa-brasil.component.html',
  styleUrls: ['./futebol-mapa-brasil.component.css']
})
export class FutebolMapaBrasilComponent implements OnInit {

  private chart: AmChart;
  private icon: string = "M21.25,8.375V28h6.5V8.375H21.25zM12.25,28h6.5V4.125h-6.5V28zM3.25,28h6.5V12.625h-6.5V28z";
  private entidades: Entidade[];
  private images: any[] = [];
  private entidadeShared: Entidade;

  constructor(private AmCharts: AmChartsService,
              private entidadeService: EntidadesServiceService,
              private sharedEntity: SharedEntityService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.sharedEntity.entidadeInformada$.subscribe( ent => {
      this.entidadeShared = ent.entidade;

      this.entidadeService.getListaEntidades(1).subscribe(response => {

        var estados = new Map<string, number>();

        this.entidades = response;
        for (let entidade of this.entidades){
          if (entidade.contratos[0] == null){
            continue;
          }
          if (!estados.has(entidade.cidade.estado.nome)){
            estados.set(entidade.cidade.estado.nome, entidade.contratos[0].valor / 1000000);
          } else {
            var total = estados.get(entidade.cidade.estado.nome);
            estados.set(entidade.cidade.estado.nome, total + entidade.contratos[0].valor / 1000000);
          }
        }
        var areas: any = new Array();
        estados.forEach((v, k) => {
          console.log('Estado: ' + k + ', valor: ' + v)
          areas.push({'id': 'BR-' + k, 'value': v});
        });

        this.images = [];

        for (let i = 0; i < response.length; i++){
          this.images.push({"latitude": response[i].cidade.latitude, "longitude": response[i].cidade.longitude, "type": "circle", "color": "black", "scale": 0.5, });

          if (response[i].id == this.entidadeShared.id){
            this.images.push({"latitude": response[i].cidade.latitude, "longitude": response[i].cidade.longitude, "type": "circle", "color": "red", "scale": 1.5, });
          }
        }

        var maxValue:number = this.arrayMax(areas);       
       
        var maxValueToRender:string = '';

        if (maxValue != null ){
          maxValueToRender = maxValue.toFixed(1);
        } else {
          maxValueToRender = ''+maxValue;
        }

        areas = [];
        estados.forEach((v, k) => {
          console.log('Estado: ' + k + ', valor: ' + v)
          areas.push({'id': 'BR-' + k, 'value': parseFloat(v.toFixed(1))});
        });

        // "label": response[i].nome, "labelShiftY": 10

        this.chart = this.AmCharts.makeChart("chartdiv", {
          "type": "map",
          "theme": "light",
          "hideCredits":true,
          'colorsteps': 10,
          "dataProvider": { "map": "brazilLow", "getAreasFromMap": true,
          "images": this.images,  'areas': areas
          },
          "valueLegend": {
            "right": 10,
            "width": 150,
            "fontSize": 12,
            "minValue": "0",
            "maxValue":  maxValueToRender
          },
          "lines": {"color": "black"},
          "areasSettings": {
            "autoZoom": false,
            "selectedColor": "#80cacf",
            "color": "#b3dfe2",
            "outlineColor": "white",
            "rollOverColor": "#4db4bb",
            "outlineThickness": 2,
            "balloonText": "[[title]]: <b>[[value]]</b>",
          },
          // "smallMap": {},
          "export": {
            "enabled": true,
            "menu": []
          }
        });
      });
    });
  }

  exportChart() {
    this.chart["export"].capture({}, function() {

      // SAVE TO PNG
      this.toPNG({}, function(base64) {

        // We have now a Base64-encoded image data
        // which we can now transfer to server via AJAX
        // i.e. jQuery.post( "saveimage.php", { "data": base64 } )
        console.log(base64);
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  arrayMax(matriz:any): number{

    var max:number = 0;
    matriz.map(item => item.value).forEach(value => {
      if (max < value){
        max = value;
      }
    })

    return max;
  }

}
