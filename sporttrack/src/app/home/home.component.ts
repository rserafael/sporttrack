import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  template: ``,
  styles: []
})

export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.navigate(['/modalidades']);
  }

}
