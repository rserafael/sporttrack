import { Component, OnInit, Input, OnChanges, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,  Validators} from '@angular/forms';
import { MunicipiosService } from '../../services/municipios.service';
import { Municipio } from '../../model/municipios';
import { Entidade } from '../../model/entidade';
import { Estado } from '../../model/entidade';
import { Cidade } from '../../model/entidade';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-entidade',
  templateUrl: './entidade.component.html',
  styleUrls: ['./entidade.component.css']
})
export class EntidadeComponent implements OnInit, OnChanges {

  private  options: FormGroup;
  nome = new FormControl('', [Validators.required]);
  grupo = new FormControl('', [Validators.required]);
  private estadoSelecionado = '';
  private municipioSelecionado = '';
  private municipios: string[] = [];
  private estadosMap: Map<string, Estado> = new Map<string, Estado>();
  private municipioMap: Map<string, Cidade> = new Map<string, Cidade>();
  private estados: string[] = [];
  @Input() entidade: Entidade;


  constructor(fb: FormBuilder, private municipiosService: MunicipiosService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
   }

  ngOnInit() {
    if(!isNullOrUndefined(this.entidade.cidade)){
      this.municipios.push(this.entidade.cidade.nome);
      this.municipioSelecionado = this.entidade.cidade.nome;
    }

    this.municipiosService.getMunicipios().subscribe(response => {
      for (const municipio of response) {
        if (!this.estadosMap.has(municipio.uf)) {
          this.estadosMap.set(municipio.uf, {'id': municipio.codigo_uf, 'nome': municipio.uf});
        }
      }
      this.estadosMap.forEach(key => this.estados.push(key.nome));
      this.estadoSelecionado = this.entidade.cidade.estado.nome;
      this.onEstadoEScolhido(this.estadoSelecionado);
    });
  }

  ngOnChanges() {
    if(!isNullOrUndefined(this.entidade.cidade)){
      this.municipios.push(this.entidade.cidade.nome);

      this.municipioSelecionado = this.entidade.cidade.nome;
      console.log(this.municipioSelecionado)
      this.estadoSelecionado = this.entidade.cidade.estado.nome;
    }
  }

  getErrorMessage() {
    return this.nome.hasError('required') ? 'Você precisa digitar um nome para esta nova entidade' : '';
  }

  onEstadoEScolhido(valor: string) {
    this.municipioMap = new Map<string, Cidade>();
    this.municipiosService.getMunicipios().subscribe(response => {
      this.municipios = [];
      for (const municipio of response) {
        if (municipio.uf === valor) {
          const estado = this.estadosMap.get(municipio.uf);
          this.municipioMap.set(municipio.nome_municipio, {'version': 0, 'id': municipio.codigo_ibge,
          'estado': estado, 'nome': municipio.nome_municipio, 'latitude': municipio.latitude,
          'longitude': municipio.longitude});
          this.municipios.push(municipio.nome_municipio);
        }
      }
      if (valor !== '') {
        this.estadoSelecionado = valor;
        console.log('Estado escolhido foi: ' + this.estadoSelecionado);
      }

    });
  }

  escolherMunicipio(municipioSelecionado) {
    this.municipioSelecionado = municipioSelecionado.value;
    console.log('Municipio escolhido foi: ' + this.municipioSelecionado);
    const cidade = this.municipioMap.get(this.municipioSelecionado);
    this.entidade.cidade = cidade;
  }

  onNomeInput(nomeEntidade) {
    this.entidade.nome = nomeEntidade;
  }

  onGrupoInput(nomeGrupo) {
    this.entidade.grupo = nomeGrupo;
  }

  onAgioMaxInput(agio){
    this.entidade.agioMax = agio;
    console.log('Ágio max: ' + agio);
  }
}
