import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// App is our top level component
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

export { ApiService, AuthService };
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
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers,
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}

