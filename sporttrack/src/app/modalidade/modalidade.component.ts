import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalidade',
  templateUrl: './modalidade.component.html',
  styleUrls: ['./modalidade.component.css']
})
export class ModalidadeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cards = [
    { modalidade: 'Futebol', cols: 1, rows: 2, content: 'app-futebol' },
    { modalidade: 'Corrida', cols: 1, rows: 2, content: 'app-corrida' },
  ];

}
