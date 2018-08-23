import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <main-nav></main-nav>
  <router-outlet></router-outlet>
`,
})
export class AppComponent {
  title = 'app';
}
