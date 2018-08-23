import { Component, OnInit, OnChanges, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageSimulacaoDBService } from '../../../services/local-storage-simulacao-db.service';
import { SharedinvestimentoService } from '../../../services/sharedinvestimento.service';
import { Simulacao } from '../../../model/simulacao';
import { SimulacaoDB } from '../../../model/SimulacaoDB';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Entidade } from '../../../model/entidade';
import { Variavel } from '../../../model/variavel';
import { SimulacaoService } from '../../../services/simulacao.service'

@Component({
  selector: 'app-simulacao-tabs',
  templateUrl: './simulacao-tabs.component.html',
  styleUrls: ['./simulacao-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimulacaoTabsComponent implements OnInit, OnChanges, OnDestroy {

  public idSimulacaoParaEditar: string = "";
  public simulacaoParaEditar: Simulacao;
  private route$: Subscription;
  private investimento: number;
  private investimentoTotalPlanilha: number;
  private entidades: Entidade[];
  private variaveis: Variavel[];
  private descricao: string;
  @Input() modalidade;


  constructor(private simulacaoDB: LocalStorageSimulacaoDBService, private route: ActivatedRoute
    , private sharedInvestimento: SharedinvestimentoService, private simulacaoService: SimulacaoService) {

  }


  ngOnInit() {
    console.log('INJETADA A MODALIDADE: ' + this.modalidade);

    this.route$ = this.route.params.subscribe(
      (params: Params) => {
        this.idSimulacaoParaEditar = params['id']; // cast to number
        console.log('Recebido pelo router o id: ' + this.idSimulacaoParaEditar);



        this.simulacaoService.getSimulacao(this.idSimulacaoParaEditar).subscribe(response => {
          
          this.simulacaoParaEditar = JSON.parse(response['simulacao']);
          this.simulacaoParaEditar.id = this.idSimulacaoParaEditar;
          this.entidades = this.simulacaoParaEditar.entidades; 
          // console.log('ENTIDADE ENVIADA PARA INJETAR: ' + JSON.stringify(this.entidades));        
          this.variaveis = this.simulacaoParaEditar.variaveis;
          // console.log('VARIAVEIS ENVIADA PARA INJETAR: ' + JSON.stringify(this.entidades));  
          this.investimentoTotalPlanilha = this.simulacaoParaEditar.investimentoTotalPlanilha;
          this.investimento = this.simulacaoParaEditar.investimento;
          this.descricao = this.simulacaoParaEditar.descricao;
          this.sharedInvestimento.enviaInvestimento(this.simulacaoParaEditar);
        });
      }

    );
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }

  submitChange() {
    console.log('Submit change funciona!');
    this.sharedInvestimento.enviaInvestimento(this.simulacaoParaEditar);
  }

}
