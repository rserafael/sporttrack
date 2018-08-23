import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SimulacaoTabsTableVariaveisDataSource } from './simulacao-tabs-table-variaveis-datasource';
import { Variavel } from '../../../../model/variavel';
import { Simulacao } from '../../../../model/simulacao';
import { SelectionModel} from '@angular/cdk/collections';
import { VariaveisServiceService } from '../../../../services/variaveis-service.service';
import { SharedinvestimentoService } from '../../../../services/sharedinvestimento.service';
import { LocalStorageSimulacaoDBService } from '../../../../services/local-storage-simulacao-db.service';

@Component({
  selector: 'simulacoes-simulacao-simulacao-tabs-simulacao-tabs-table-variaveis',
  templateUrl: './simulacao-tabs-table-variaveis.component.html',
  styleUrls: ['./simulacao-tabs-table-variaveis.component.css']
})
export class SimulacaoTabsTableVariaveisComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SimulacaoTabsTableVariaveisDataSource;
  @Input() variaveis: Variavel[];
  @Input() simulacao: Simulacao;
  @Input() modalidade: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'nome', 'peso'];
  selectionForVariables = new SelectionModel<Variavel>(true, []);

  constructor(private variavelService: VariaveisServiceService, private investimentoService: SharedinvestimentoService, private localStrorage: LocalStorageSimulacaoDBService){}

  ngOnInit() {

    // console.log('VARIAVEIS RECEBIDA PARA INJETAR: ' + JSON.stringify(this.variaveis));


    this,this.variavelService.getListaVariaveis(this.modalidade).subscribe(response => {
      var todasVariaveis: Variavel[] = response;



      this.dataSource = new SimulacaoTabsTableVariaveisDataSource(this.paginator, this.sort, todasVariaveis);

      this.dataSource.data.forEach(row => {
        for (let selected of this.variaveis){
          if (selected.id == row.id){
            this.selectionForVariables.select(row);
            row.peso = selected.peso;
          }
        }
      });       
    });    
  }

  isAllVariablesSelected() {
    const numSelected = this.selectionForVariables.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleVariables() {

    this.isAllVariablesSelected() ?
        this.selectionForVariables.clear() :
        this.dataSource.data.forEach(row => {
          this.selectionForVariables.select(row);
        });       
  }

  onChecked(row){
    this.selectionForVariables.toggle(row);
    this.simulacao.variaveis = this.selectionForVariables.selected;
    this.investimentoService.enviaInvestimento(this.simulacao);
  }

  changePeso(row){
    
    if ( !this.selectionForVariables.isSelected(row) ){
      this.selectionForVariables.toggle(row);
    }
    
    this.simulacao.variaveis = this.selectionForVariables.selected;
    this.investimentoService.enviaInvestimento(this.simulacao);
  }
}
