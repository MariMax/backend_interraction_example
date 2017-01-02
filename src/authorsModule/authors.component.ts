import { Component, ViewEncapsulation } from '@angular/core';
import { AuthorsService } from './authors.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'authors',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [
    './styles.css',
  ],
  host:{
    style:`flex:1`
  },
  template: require('./template.html'),
})
export class AuthorsComponent {
  authors: Observable<Array<Object>>;
  constructor(private authorsService: AuthorsService) { }

  getAuthors() {
    this.authors = this.authorsService.getAuthors();
  }
}