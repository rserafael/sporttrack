import { Component, OnInit } from '@angular/core';
import { Variavel } from '../../model/variavel';
import { VariaveisServiceService } from '../../services/variaveis-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-variavel',
  templateUrl: './nova-variavel.component.html',
  styleUrls: ['./nova-variavel.component.css']
})
export class NovaVariavelComponent implements OnInit {

  private nome: string;
  private peso: number;
  private posicao: number;
  private variaveis: Variavel[] = [];
  private id: number;
  private novaVariavel: Variavel;

  constructor(private variavelService: VariaveisServiceService, private router: Router) { }

  ngOnInit() {

    this.variavelService.getListaVariaveis(1).subscribe(response => {
      this.variaveis = response;
      let variavel = this.variaveis.pop();
      this.id = variavel.id + 1;
    });
  }

  criarVariavel() {
    this.novaVariavel = {'version': 0, 'id': null, 'nome': this.nome, 'peso': this.peso, 'ordem': this.posicao};
    this.variavelService.insere(this.novaVariavel).subscribe(variavel => this.novaVariavel = variavel);

    this.router.navigate(['/dados', this.nome]);

  }

}
