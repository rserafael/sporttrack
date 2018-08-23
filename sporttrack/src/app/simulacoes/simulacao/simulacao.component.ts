import { Component, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import { LocalStorageSimulacaoDBService } from '../../services/local-storage-simulacao-db.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Simulacao } from '../../model/simulacao';
import { SimulacaoDB } from '../../model/SimulacaoDB';
import { User } from '../../auth/user';
import { SimulacaoService } from '../../services/simulacao.service';

@Component({
  selector: 'app-simulacao',
  templateUrl: './simulacao.component.html',
  styleUrls: ['./simulacao.component.css']
})
export class SimulacaoComponent implements OnInit, OnChanges {

  tiles = [
    { title: 'Simulação', cols: 2, rows: 1, content: 'app-simulacao-tabela' },
    { title: 'Tabs', cols: 1, rows: 1, content: 'app-simulacao-tabs' },
  ];

  private investimento: number;
  public simulacaoParaEditar: string = "";
  private route$: Subscription;
  private userName: string;
  private modalidade: number;

  constructor(private simulacaoDB: LocalStorageSimulacaoDBService, private route: ActivatedRoute, private simulacaoService: SimulacaoService) { 
  }

  ngOnInit() {

    this.route$ = this.route.params.subscribe(
      (params: Params) => {
        this.simulacaoParaEditar = params['id']; // cast to number
        this.userName =  params['user'];
        this.modalidade = params['modalidade'];
        console.log('Recebido pelo router em SIMULACAO a simulacao ID: ' + this.simulacaoParaEditar);
        console.log('Recebido pelo router em SIMULACAO o USER ID: ' + this.userName);
        console.log('Recebido pelo router em SIMULACAO A MODALIDADE: ' + this.modalidade);

        this.simulacaoService.getSimulacao(this.simulacaoParaEditar).subscribe(response => {         
          var simulacao:Simulacao = JSON.parse(response['simulacao'])
          this.investimento = simulacao.investimento; 
        });

        // var simulacao:Simulacao = this.simulacaoDB.getSimulacaoOnLocalStorage(this.simulacaoParaEditar);
        // this.investimento = simulacao.investimento;
        }
    );
  }

  ngOnChanges(){

  }

}
