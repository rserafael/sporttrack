import { Component, OnInit } from '@angular/core';
import { Entidade } from '../../../model/entidade';
import { SharedEntityService } from '../../../services/shared-entity.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-corrida-numeros',
  templateUrl: './corrida-numeros.component.html',
  styleUrls: ['./corrida-numeros.component.css']
})
export class CorridaNumerosComponent implements OnInit {

  private entidade: Entidade;
  private subscription: Subscription;

  cards = [
    {text: 'One', cols: 1, rows: 1, content: 'app-corrida-indicadores'},
    {text: 'Two', cols: 1, rows: 1, content: 'app-corrida-grafico'},
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
