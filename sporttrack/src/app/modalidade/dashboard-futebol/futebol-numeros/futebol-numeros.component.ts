import { Component, OnInit } from '@angular/core';
import { Entidade } from '../../../model/entidade';
import { SharedEntityService } from '../../../services/shared-entity.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-futebol-numeros',
  templateUrl: './futebol-numeros.component.html',
  styleUrls: ['./futebol-numeros.component.css']
})
export class FutebolNumerosComponent implements OnInit {

  private entidade: Entidade;
  private subscription: Subscription;

  cards = [
    {text: 'One', cols: 1, rows: 1, content: 'app-futebol-indicadores'},
    {text: 'Two', cols: 1, rows: 1, content: 'app-futebol-grafico'},
  ];

  constructor(private entidadeCompatilhadaService: SharedEntityService) {
    this.subscription = entidadeCompatilhadaService.entidadeInformada$.subscribe(ent => {
      console.log('Recebida entidade compartilhada: ' + ent.entidade.nome);
      this.entidade = ent.entidade;
    });
   }

  ngOnInit() {
  }

}
