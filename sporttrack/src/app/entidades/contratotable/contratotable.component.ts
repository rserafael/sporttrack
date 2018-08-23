import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ContratotableDataSource } from './contratotable-datasource';
import { Entidade } from '../../model/entidade';
import { Contrato } from '../../model/contrato';
import {FormBuilder, FormGroup, FormControl,  Validators} from '@angular/forms';
import * as moment from 'moment';
import { EntidadesServiceService } from '../../services/entidades-service.service';

@Component({
  selector: 'entidades-contratotable',
  templateUrl: './contratotable.component.html',
  styleUrls: ['./contratotable.component.css']
})
export class ContratotableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ContratotableDataSource;
  @Input() entidade: Entidade;
  private contratos: Contrato[] = [];
  date = new FormControl(new Date());
  @Input() controleIdContratos: number[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'valor', 'dataInicio',  'acoes'];

  constructor(private entidadeService: EntidadesServiceService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.contratos = [];
    for (let contrato of this.entidade.contratos) {
      this.contratos.push({ 'id': contrato.id, 'nome': 0, 'dataInicio': new Date(contrato.data), 'valor': contrato.valor });
    }

    this.dataSource = new ContratotableDataSource(this.paginator, this.sort, this.contratos);
  }

  salvarContrato(row){
    var novo = true;
    for (let contrato of this.entidade.contratos){
      if (contrato.id == row.id){
        contrato.data = row.dataInicio;
        contrato.valor = row.valor;
        novo = false;
      }
    }

    if (novo){
      this.entidade.contratos.push({'version': 0, 'id': row.id, 'valor': row.valor, 'data': row.dataInicio});
    }

    this.entidadeService.insereEntidade(this.entidade).subscribe(response => console.log(response));

    console.log('Contratos salvos: ' + JSON.stringify(this.entidade.contratos));
  }

  deletarContrato(row){
    var index = -1;
    var del = 0;
    for (let contrato of this.contratos){
      if (contrato.id == row.id){
        index = del;
      }
      del++;
    }
    this.contratos.splice(index, 1);
    this.dataSource = new ContratotableDataSource(this.paginator, this.sort, this.contratos);
  }

  criarContrato(){
    this.controleIdContratos.sort((n1,n2) => n1 - n2);
    var last = this.controleIdContratos[this.controleIdContratos.length - 1];
    this.contratos.push({ 'id': last + 1, 'nome': 0, 'dataInicio': new Date(), 'valor': 0 });
    this.controleIdContratos.push(last + 1);
    this.dataSource = new ContratotableDataSource(this.paginator, this.sort, this.contratos);

  }

  onDateChange(event){
    console.log('Date change: ' + JSON.stringify(event));

    this.dataSource = new ContratotableDataSource(this.paginator, this.sort, this.contratos);
  }

}
