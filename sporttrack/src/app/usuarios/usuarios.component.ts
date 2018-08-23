import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsuariosDataSource } from './usuarios-datasource';
import {Usuario} from '../model/usuario';
import {UsuarioServiceService} from '../services/usuario-service.service';
import {isNullOrUndefined} from 'util';
import {GlobalvarsService} from "../services/globalvars.service";

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsuariosDataSource;
  usuario: Usuario;
  adicionarUsuario = false;
  usuarios: Usuario[] = [];
  public admin:boolean;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'admin'];

  constructor(private usuarioService: UsuarioServiceService, private globals:GlobalvarsService) {}

  ngOnInit() {

    this.usuarioService.recuperarUsuarios().subscribe(response => {
      this.usuarios = response;
      console.log('Usuarios: ' + JSON.stringify(this.usuarios));
      this.dataSource = new UsuariosDataSource(this.paginator, this.sort, this.usuarios);
    });
    this.admin = this.globals.user.tipoUsuario === 'Administrador';

  }

  criarUsuario() {
    this.adicionarUsuario = true;
    this.usuario =  new Usuario();
    console.log('Criar novo usuario fnciona!');
  }
  usuarioAdicionado() {
    this.adicionarUsuario = false;
  }
  public salvar() {
    if (isNullOrUndefined(this.usuario.id) || (this.usuario.id === 0)) {
      this.usuarioService.salvarEntidade(this.usuario).subscribe(msg => {console.log(msg); this.usuario = null; } ) ;
    } else {
      this.usuarioService.alteraUsuario(this.usuario).subscribe(msg => {
        this.usuario = null;
      });
    }
  }

  onSelect(row) {
    console.log(row);
    this.usuario = row;
  }


}
