import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { Simulacao } from '../../../../model/simulacao';
import { Entidade } from '../../../../model/entidade';
import { SimulacaoTabsTableEntidadesDataSource } from './simulacao-tabs-table-entidades-datasource';
import { EntidadesServiceService } from '../../../../services/entidades-service.service';
import { SharedinvestimentoService } from '../../../../services/sharedinvestimento.service';
import { LocalStorageSimulacaoDBService } from '../../../../services/local-storage-simulacao-db.service';


@Component({
  selector: 'simulacoes-simulacao-simulacao-tabs-simulacao-tabs-table-entidades',
  templateUrl: './simulacao-tabs-table-entidades.component.html',
  styleUrls: ['./simulacao-tabs-table-entidades.component.css']
})


export class SimulacaoTabsTableEntidadesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() entidades: Entidade[];
  @Input() simulacao: Simulacao;
  @Input() modalidade: number;

  dataSource: SimulacaoTabsTableEntidadesDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name'];
  selectionForEntities = new SelectionModel<Entidade>(true, []);

  constructor(private servicoEntidade: EntidadesServiceService, private investimentoService: SharedinvestimentoService, private localStrorage: LocalStorageSimulacaoDBService){}

  ngOnInit() {

    this.servicoEntidade.getListaEntidades(this.modalidade).subscribe(response => {
      var todasEntidades: Entidade[] = response;

      this.dataSource = new SimulacaoTabsTableEntidadesDataSource(this.paginator, this.sort, todasEntidades);

      this.dataSource.data.forEach(row => {
        for (let selected of this.entidades){
          if (selected.id == row.id){
            this.selectionForEntities.select(row);
          }
        }
      });       
    });   
  }

  isAllEntitiesSelected() {
    const numSelected = this.selectionForEntities.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleEntities() {

    this.isAllEntitiesSelected() ?
        this.selectionForEntities.clear() :
        this.dataSource.data.forEach(row => {
          this.selectionForEntities.select(row);
        });        
  }

  onChecked(row){
      
    if (this.selectionForEntities.isSelected(row)){
      for (let i = 0; i < this.simulacao.entidades.length; i++){
        console.log(this.simulacao.entidades[i].nome);
        console.log(row['nome']);
        if (this.simulacao.entidades[i].nome == row['nome']){
          this.simulacao.entidades.splice(i, 1);
          this.selectionForEntities.toggle(row);
        }       
      }
    } else {
      this.selectionForEntities.toggle(row);
    }
    this.simulacao.entidades = this.selectionForEntities.selected;
    this.simulacao.entidades.forEach(ent => console.log('toggle' + ent.nome));  
    this.investimentoService.enviaInvestimento(this.simulacao);
  }
}
