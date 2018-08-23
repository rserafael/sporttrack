import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../model/usuario';
import {UsuarioServiceService} from '../../services/usuario-service.service';
import {MunicipiosService} from '../../services/municipios.service';
import {Cidade, Estado} from '../../model/entidade';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnChanges {

  private registerForm: FormGroup;
  private submitted = false;
  private sexos: string[] = ['Masculino', 'Feminino'];
  private tipos: string[] = ['Administrador', 'Simples'];


  @Input() usuario: Usuario;
  private estadoSelecionado = '';
  private municipioSelecionado = '';
  private municipios: string[] = [];
  private estadosMap: Map<string, Estado> = new Map<string, Estado>();
  private municipioMap: Map<string, Cidade> = new Map<string, Cidade>();
  private estados: string[] = [];
  private options: FormGroup;


  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioServiceService,
              private municipiosService: MunicipiosService) {
    this.options = formBuilder.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }




  ngOnInit() {


    this.municipiosService.getMunicipios().subscribe(response => {
      for (const municipio of response) {
        if (!this.estadosMap.has(municipio.uf)) {
          this.estadosMap.set(municipio.uf, {'id': municipio.codigo_uf, 'nome': municipio.uf});
        }
      }
      this.estadosMap.forEach(key => this.estados.push(key.nome));
      if ( !isNullOrUndefined(this.usuario.cidade) ) {
  this.estadoSelecionado = this.usuario.cidade.estado.nome;
  this.onEstadoEScolhido(this.estadoSelecionado);
}
    });
  }

  ngOnChanges() {
    console.log('changes');
    if (this.usuario.cidade != null) {
    this.municipioSelecionado = this.usuario.cidade.nome;

      if (this.usuario.cidade.estado != null) {
        this.estadoSelecionado = this.usuario.cidade.estado.nome;
        // console.log('Estidade: ' + JSON.stringify(this.usuario));
      }
    }
  }

  onEstadoEScolhido(valor: string) {
    this.municipioMap = new Map<string, Cidade>();
    this.municipiosService.getMunicipios().subscribe(response => {
      for (const municipio of response) {
        if (municipio.uf === valor) {
          const estado = this.estadosMap.get(municipio.uf);
          this.municipioMap.set(municipio.nome_municipio, {
            'version': 0, 'id': municipio.codigo_ibge,
            'estado': estado, 'nome': municipio.nome_municipio, 'latitude': municipio.latitude,
            'longitude': municipio.longitude
          });
          this.municipios.push(municipio.nome_municipio);
        }
      }
      if (valor !== '') {
        this.estadoSelecionado = valor;
        console.log('Estado escolhido foi: ' + this.estadoSelecionado);
      }

    });
  }

  public salvar(){
    console.log(this.usuario);
   this.usuarioService.salvarEntidade(this.usuario).subscribe(msg => console.log(msg));
  }


   escolherMunicipio(municipioSelecionado) {
    this.municipioSelecionado = municipioSelecionado.value;
    console.log('Municipio escolhido foi: ' + this.municipioSelecionado);
    const cidade = this.municipioMap.get(this.municipioSelecionado);
    this.usuario.cidade = cidade;
  }


}
