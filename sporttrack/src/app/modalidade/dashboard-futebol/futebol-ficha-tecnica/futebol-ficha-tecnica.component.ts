import { Component, OnInit} from '@angular/core';
import { Entidade } from '../../../model/entidade';
import { SharedEntityService } from '../../../services/shared-entity.service';
import { Subscription }   from 'rxjs';
import { EntidadesServiceService } from '../../../services/entidades-service.service';

declare var drawGauge: any;

@Component({
  selector: 'app-futebol-ficha-tecnica',
  templateUrl: './futebol-ficha-tecnica.component.html',
  styleUrls: ['./futebol-ficha-tecnica.component.css']
})
export class FutebolFichaTecnicaComponent implements OnInit {

  entidade: Entidade;
  subscription: Subscription;
  private investimento: number = 0;
  private nome: string;
  private cidade: string;
  private uf: string;
  private imagem = ""

  constructor(private sharedEntity: SharedEntityService,
              private entidadeService: EntidadesServiceService) {

    this.sharedEntity.entidadeInformada$.subscribe( ent => {
        this.entidade = ent.entidade;

        this.entidadeService.getListaEntidades(1).subscribe(response =>{

          for (let entidade of response){
            if (entidade.id == this.entidade.id){
              this.nome = this.entidade.nome;
              this.cidade = this.entidade.cidade.nome;
              this.uf = this.entidade.cidade.estado.nome;
              this.imagem = '../../../../assets/images/entidades/' + entidade.id + '.png';
              console.log('IMAGEM: ' + this.imagem);
              if (this.entidade.contratos.length > 0){
                this.investimento = this.entidade.contratos[0].valor;
              } else {
                this.investimento = 0;
              }
              break;
            } else {
              continue;
            }
          }
        });
    });
   }

  ngOnInit() {    
  }
}


