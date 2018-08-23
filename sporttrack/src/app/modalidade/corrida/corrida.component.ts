import { Component, OnInit } from '@angular/core';
import { EntidadesServiceService } from '../../services/entidades-service.service';
import { Entidade } from '../../model/entidade';
import { VariaveisServiceService } from '../../services/variaveis-service.service';
import { Variavel } from '../../model/variavel';
import { SharedModalidadeService } from '../../services/shared-modalidade.service';

@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  styleUrls: ['./corrida.component.css']
})
export class CorridaComponent implements OnInit {

  private variaveis: number;
  private entidades: number;
  private investimento: number;
  private modalidade: number = 2;

  private baseDados: Entidade[];
  private baseVariaveis: Variavel[];

  constructor(private entidadeService: EntidadesServiceService,
              private variaveisService: VariaveisServiceService,
              private modalidadeService: SharedModalidadeService) {
  }

  ngOnInit() {
    this.variaveis = 0;
    this.entidades = 0;
    this.investimento = 0;

    this.variaveisService.getListaVariaveis(this.modalidade).subscribe(response => {
      this.baseVariaveis = response;
      this.variaveis = this.baseVariaveis.length;
    })

    this.entidadeService.getListaEntidades(this.modalidade).subscribe(response => {

      this.baseDados = response;
      this.entidades = this.baseDados.length;

      for (let ent of this.baseDados){

        for (var _i = 0; _i < ent.contratos.length; _i++){
          this.investimento += ent.contratos[_i].valor;
        }
      }
    });
  }

  escolherModalidade(){
    this.modalidadeService.informaModalidade(2);
    this.modalidadeService.modalidadeid = 2;
  }

}
