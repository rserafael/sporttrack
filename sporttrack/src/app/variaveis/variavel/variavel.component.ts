import {Component, OnInit, Input} from '@angular/core';
import {Variavel} from '../../model/variavel';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {URLBase} from '../../const';
import {VariaveisServiceService} from '../../services/variaveis-service.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-variavel',
  templateUrl: './variavel.component.html',
  styleUrls: ['./variavel.component.css']
})
export class VariavelComponent implements OnInit {

  @Input() variavelParaEdicao: Variavel;
  private id: number;
  private nome: string;
  private peso: number;
  private ordem: number;


  constructor(private variavelService: VariaveisServiceService) {
  }

  ngOnInit() {

  }



}
