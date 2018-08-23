import { Component, OnInit } from '@angular/core';
import { EntidadesServiceService } from '../../services/entidades-service.service';
import { Entidade } from '../../model/entidade';
import { VariaveisServiceService } from '../../services/variaveis-service.service';
import { SharedModalidadeService } from '../../services/shared-modalidade.service';
import { Variavel } from '../../model/variavel';

@Component({
  selector: 'app-futebol',
  templateUrl: './futebol.component.html',
  styleUrls: ['./futebol.component.css']
})
export class FutebolComponent implements OnInit {

  private variaveis: number;
  private entidades: number;
  private investimento: number;
  private modalidade: number = 1;

  private baseDados: Entidade[];
  private baseVariaveis: Variavel[];
  private hora: number;

  constructor(private entidadeService: EntidadesServiceService,
              private variaveisService: VariaveisServiceService,
              private modalidadeService: SharedModalidadeService) {

    this.hora = Date.now();
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
      console.log( Date.now() - this.hora)
    })
  }

  escolherModalidade(){
    console.log('Escolhida Modalidade"FUTEBOL!!!!!');
    this.modalidadeService.informaModalidade(1);
    this.modalidadeService.modalidadeid = 1;
  }
}
