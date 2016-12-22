import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    './bootstrap.css',
  ],
  template: `<login-form></login-form>`
})
export class AppComponent {}