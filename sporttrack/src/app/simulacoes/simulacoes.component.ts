import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SimulacoesDataSource } from './simulacoes-datasource';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { LocalStorageSimulacaoDBService } from '../services/local-storage-simulacao-db.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../auth/user';
import { Usuario } from '../model/usuario';
import { Simulacao } from '../model/simulacao';
import { SimulacaoService } from '../services/simulacao.service';
import { UsuarioServiceService } from '../services/usuario-service.service';

@Component({
  selector: 'simulacoes',
  templateUrl: './simulacoes.component.html',
  styleUrls: ['./simulacoes.component.css']
})
export class SimulacoesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SimulacoesDataSource;
  private route$: Subscription;
  modalidade: number;
  userName: string;
  private usuario: Usuario;
  // private simulacaoParaEditar: any[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'titulo', 'criacao', 'execucao', 'entidades', 'indicadores', 'acoes'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private localDbService: LocalStorageSimulacaoDBService
    , private router: Router, private activatedRouter: ActivatedRoute, private simulacaoService: SimulacaoService
    , private usuarioService: UsuarioServiceService) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));

        localDbService.simulacaoRecebida$.subscribe(simulacao => {
          console.log('Sou o pai e recebi confirmacao: ' + simulacao);
        });
  }

  ngOnInit() {

    this.route$ = this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.modalidade = params['modalidade']; // cast to number
        this.userName = params['user']; // cast to number
        console.log('Recebido pelo router a modalidade: ' + this.modalidade);
        console.log('Recebido pelo router o user: ' + this.userName);

        this.usuarioService.recuperarUsuarios().subscribe(response => {
          for (let user of response){
            if (user.email == params['user']){
              console.log('Recebido pelo router EM NOVA SIMULACAO o user: ' + params['user'] + ', cujo ID: ' + user.id);
              this.usuario = user;
              break;
            }
          }

          this.simulacaoService.getSimulacoesUsuario(this.usuario.id).subscribe(response => {
            var localbd = response;
            var simulacoes: any[] = [];
            for (let item of localbd){
              var simulacao: Simulacao;
              simulacao = JSON.parse(item.simulacao);
              simulacao.titulo = simulacao.id
              simulacao.id = item.id;
              if (simulacao.modalidade == this.modalidade){ 
                var data = simulacao.dataCriacao;
                console.log('Data: ' + data);         
                simulacoes.push(simulacao);
              }
            }        
            this.dataSource = new SimulacoesDataSource(this.paginator, this.sort, simulacoes);
          });
        });
    });
  }

  editarSimulacao(id: string){
    console.log('Editar simulação funciona! ' + id);
    // this.localDbService.informaSimulacaoParaEditar(id);
    this.router.navigate(['/simulacao', this.modalidade, id, this.userName]);
  }

  deletarSimulacao(id: string){

    this.simulacaoService.removerSimulacao(+id).subscribe(response => {
      console.log(response);

      this.simulacaoService.getSimulacoesUsuario(this.usuario.id).subscribe(response => {
        var localbd = response;
        var simulacoes: any[] = [];
        for (let item of localbd){
          var simulacao: Simulacao;
          simulacao = JSON.parse(item.simulacao);
          simulacao.titulo = simulacao.id
          simulacao.id = item.id;
          if (simulacao.modalidade == this.modalidade){                
            simulacoes.push(simulacao);
          }
        }        
        this.dataSource = new SimulacoesDataSource(this.paginator, this.sort, simulacoes);
      });
    });

    // var simulacoes: any[] = [];
    // for (let simulacao of localbd){
    //   if (simulacao.modalidade == this.modalidade){
    //     simulacoes.push(simulacao);
    //   }
    // }
    
    // this.dataSource = new SimulacoesDataSource(this.paginator, this.sort, simulacoes);
  }

  onNovaSimulacao(){
    console.log('Nova simulacao funciona!')
    this.router.navigate(['/novasimulacao', this.modalidade, this.userName]);
  }
}
