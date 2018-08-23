import { Component } from '@angular/core';
import { SharedEntityService } from '../../services/shared-entity.service';
import * as domtoimage from 'dom-to-image'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { saveAs } from 'file-saver/FileSaver';


@Component({
  selector: 'dashboard-corrida',
  templateUrl: './dashboard-corrida.component.html',
  styleUrls: ['./dashboard-corrida.component.css']
})
export class DashboardCorridaComponent {
  
  cards = [
    { title: 'Ranking', cols: 1, rows: 3, content: 'corrida-ranking-table' },
    { title: 'Ficha Técnica', cols: 1, rows: 1, content: 'app-corrida-ficha-tecnica' },
    { title: 'Localização', cols: 1, rows: 3, content: 'app-corrida-mapa-brasil' },
    { title: 'Gráficos', cols: 1, rows: 2, content: 'app-corrida-numeros' },    
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  takeScreenShot(){
    var node = document.getElementById('screenshot2');
    domtoimage.toBlob(node).then(function (blob) {
     saveAs(blob, 'sporttrack-dashboard-corrida.png');     
  });
  }

}
