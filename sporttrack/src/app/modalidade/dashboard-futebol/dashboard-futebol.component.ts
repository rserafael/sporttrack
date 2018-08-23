import { Component } from '@angular/core';
import { SharedEntityService } from '../../services/shared-entity.service';
import * as domtoimage from 'dom-to-image'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'dashboard-futebol',
  templateUrl: './dashboard-futebol.component.html',
  styleUrls: ['./dashboard-futebol.component.css'],
})

export class DashboardFutebolComponent {

  cards = [
    { title: 'Ranking', cols: 1, rows: 3, content: 'futebol-ranking-table' },
    { title: 'Ficha Técnica', cols: 1, rows: 1, content: 'app-futebol-ficha-tecnica' },
    { title: 'Localização', cols: 1, rows: 3, content: 'app-futebol-mapa-brasil' },
    { title: 'Gráficos', cols: 1, rows: 2, content: 'app-futebol-numeros' },    
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  takeScreenShot(){
    var node = document.getElementById('screenshot');
    domtoimage.toBlob(node).then(function (blob) {
      saveAs(blob, 'sporttrack-dashboard-futebol.png');     
  });
  }
  
}
