import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    './bootstrap.css',
  ],
  template: `
    <div>
      <login-form></login-form>
      <div class="controls">
        <authors></authors>
        <courses></courses>
      </div>
    </div>
  `
})
export class AppComponent { }