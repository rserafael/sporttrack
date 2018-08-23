import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FutebolRankingDataSource } from './futebol-ranking-datasource';
import { EntidadesServiceService } from '../../../services/entidades-service.service';
import { SharedEntityService } from '../../../services/shared-entity.service';
import { Entidade } from '../../../model/entidade';
import { VariaveisServiceService } from '../../../services/variaveis-service.service';
import { DadosServiceService } from '../../../services/dados-service.service';
import { PontoService } from '../../../services/ponto.service';
import { Variavel } from '../../../model/variavel';
import { Dados } from '../../../model/dado';
import { RankingTable } from '../../../model/rankingTable';
import { SharedEntidade } from '../../../model/sharedEntity';
import { EntidadeVariavel } from '../../../model/entidadeVariavel';
import { Ponto } from '../../../model/ponto';


export interface resultadoMapItem {
  grupo: string;
  invetimento: number;
  pontos: number;
}

export interface CadastroEntidade {
  nome: string;
  pontosComPeso: number;
  entidade: Entidade;
}

@Component({
  selector: 'futebol-ranking-table',
  templateUrl: './futebol-ranking.component.html',
  styleUrls: ['./futebol-ranking.component.css']
})
export class FutebolRankingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() selecionado = new EventEmitter<boolean>();

  dataSource: FutebolRankingDataSource | null;
  private selectedEntidade: Entidade;
  private entidades: Entidade[] = [];
  private cadastroEntidades: CadastroEntidade[] = []
  private variaveis: Variavel[];
  private selectedVariable: number = 0;
  private rankData: RankingTable[] = [];
  private dados: Dados[];
  private counter: number = 0;
  private sharedEntities: SharedEntidade[] = [];
  private pontos: Ponto[] = [];
  private mapaPontos = new Map<number, { 'com': number, 'sem': number }>();

  private mapaVariaveis = new Map<number, number>();
  private mapaEntidades = new Map<number, number>();
  private controleIdContratos: number[] = [];
  private spinnerColor: string = 'primary';
  private spinnerMode: string = 'indeterminate';
  private dataLoaded: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank', 'nome', 'valor'];

  constructor(private entidadeService: EntidadesServiceService,
    private variaveisService: VariaveisServiceService,
    private sharedEntidade: SharedEntityService,
    private dadosService: DadosServiceService,
    private pontoService: PontoService) {

    sharedEntidade.entidadeRecebida$.subscribe(entidade => {
      console.log('Sou o pai e recebi confirmacao: ' + entidade);
    });

    this.dados = [];
  }

  ngOnInit() {

    this.variaveisService.getListaVariaveis(1).subscribe(response => {

      this.variaveis = response;
      this.variaveis.push({ 'version': 0, 'id': 0, 'nome': 'Pontos', 'peso': 1, 'ordem': 0 });

      // Constroi-se o mapa de variaveis cujo objetivo é: dado o id de uma variavel 
      // buscar seu indice no array de variaveis. Chave é o id da variavel e valor sua posicao no array.
      for (let i = 0; i < this.variaveis.length; i++) {
        this.mapaVariaveis.set(this.variaveis[i].id, i);
      }

      this.entidadeService.getListaEntidades(1).subscribe(response => {
        this.entidades = response;

        // Constroi-se o mapa de entidades cujo objetivo é: dado o id de uma entidade 
        // buscar seu indice no array de entidades. Chave é o id da entidade e valor sua posicao no array.
        for (let i = 0; i < this.entidades.length; i++) {
          this.mapaEntidades.set(this.entidades[i].id, i);
        }

        this.recuperaPontos();
          // Neste momento podemos utilizar o indice zero pois por default exibimos a primeira entrada do array, seja quem for.
        this.selectedEntidade = this.entidades[0];
        // Neste momento podemos utilizar o indice zero pois por default exibimos a primeira entrada do array, seja qual variavel for.
        var entidadeVariavel: EntidadeVariavel = { 'entidade': this.selectedEntidade, 'variavel': this.variaveis[0] };
        this.sharedEntidade.informaEntidade(entidadeVariavel);
      });
    });
  }

  onSelect(entidade: RankingTable) {
    this.selectedEntidade = entidade.entidade;
    var entidadeVariavel: EntidadeVariavel = { 'entidade': this.selectedEntidade, 'variavel': this.variaveis[this.mapaVariaveis.get(this.selectedVariable)]};
    this.sharedEntidade.informaEntidade(entidadeVariavel);
  }

  changeVariable(event) {
    this.counter = 0;
    this.selectedVariable = event;
    var entidadeVariavel: EntidadeVariavel = { 'entidade': this.selectedEntidade, 'variavel': this.variaveis[this.mapaVariaveis.get(this.selectedVariable)]};
    this.sharedEntidade.informaEntidade(entidadeVariavel);
    this.buildTableForVariable(event);
  }

  buildTableForVariable(variable: number) {

    if (variable == 0) {
      this.recuperaPontos();
    }

    this.dadosService.getListaDadosAtuais(variable).subscribe(response => {
      // this.dados = response;
      this.rankData = [];
      this.sharedEntities = [];

      // console.log('Dados length: ' + JSON.stringify(response));

      this.dados = response.sort((dado1, dado2) => (dado1.valor < dado2.valor ? 1 : -1));

      let i: number = 1;
      let r: number = 1;
      let previousValue = 0
      for (let dado of this.dados) {

        if (previousValue != dado.valor) {
          r = i;
          i++
        } else {
          i++;
        }

        const rankItem: RankingTable = { 'variavel': dado.id, 'nomeEntidade': dado.entidade.nome, 'valor': dado.valor, 'rank': r, 'entidade': dado.entidade };
        this.rankData.push(rankItem);

        const data: Date = new Date();

        this.sharedEntities.push({ 'rankingTable': rankItem, 'dadosCompartilhados': [{ 'data': data, 'valor': 0 }] });

        previousValue = dado.valor;
      }
      this.dataSource = new FutebolRankingDataSource(this.paginator, this.sort, this.rankData);
    });
  }

  recuperaPontos() {

    this.cadastroEntidades = [];
    this.mapaPontos = new Map<number, { 'com': number, 'sem': number }>();

    this.pontoService.getPontosParaEntidadesParaPontoAtual(1).subscribe(response => {
      this.pontos = response;

      for (let ponto of this.pontos) {
        if (!this.mapaPontos.has(ponto.entidade.id)) {
          this.mapaPontos.set(ponto.entidade.id, { 'sem': (ponto.valor * 100), 'com': (ponto.valor * ponto.variavel.peso * 100) });
        } else {
          var parcial = this.mapaPontos.get((ponto.entidade.id));
          this.mapaPontos.set(ponto.entidade.id, { 'sem': (parcial.sem + ponto.valor * 100), 'com': (parcial.com + ponto.valor * ponto.variavel.peso * 100) });
        }
      }

      this.entidadeService.getListaEntidades(1).subscribe(response => {
        for (let entidade of response) {
          if (!this.mapaPontos.has(entidade.id)) {
            continue;
          }
          var cadastroEntidade;
          var valorComPeso = this.mapaPontos.get(entidade.id).com;
          if (entidade.contratos.length == 0) {
            cadastroEntidade = { 'nome': entidade.nome, 'pontosComPeso': valorComPeso.toFixed(2), 'entidade': entidade };
          } else {
            cadastroEntidade = { 'nome': entidade.nome, 'pontosComPeso': valorComPeso.toFixed(2), 'entidade': entidade };
            for (let i = 0; i < entidade.contratos.length; i++) {
              this.controleIdContratos.push(entidade.contratos[i].id);
            }
          }
          this.cadastroEntidades.push(cadastroEntidade);
        }

        this.rankData = [];
        this.sharedEntities = [];

        this.cadastroEntidades.sort((dado1, dado2) => (+dado1.pontosComPeso < +dado2.pontosComPeso ? 1 : -1));

        let i: number = 1;
        let r: number = 1;
        let previousValue = 0
        for (let entidade of this.cadastroEntidades) {

          if (previousValue != entidade.pontosComPeso) {
            r = i;
            i++
          } else {
            i++;
          }

          const rankItem: RankingTable = { 'variavel': 0, 'nomeEntidade': entidade.nome, 'valor': entidade.pontosComPeso, 'rank': r, 'entidade': entidade.entidade };
          this.rankData.push(rankItem);

          const data: Date = new Date();

          this.sharedEntities.push({ 'rankingTable': rankItem, 'dadosCompartilhados': [{ 'data': data, 'valor': 0 }] });

          previousValue = entidade.pontosComPeso;
        }

        this.dataLoaded = true;
        this.dataSource = new FutebolRankingDataSource(this.paginator, this.sort, this.rankData);

      });
    });
  }
}
