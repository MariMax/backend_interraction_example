import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// App is our top level component
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

const providers = [ApiService, AuthService];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: providers,
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: providers,
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }

}

