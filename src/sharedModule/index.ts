import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// App is our top level component
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

// Application wide providers
const APP_PROVIDERS = [
  ApiService,
  AuthService,
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports : [FormsModule, ReactiveFormsModule],
  providers: [
    APP_PROVIDERS
  ]
})
export class SharedModule {}

