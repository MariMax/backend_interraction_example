import { NgModule } from '@angular/core';
import { SharedModule } from '../sharedModule';

// App is our top level component
import { LoginFormComponent } from '../loginForm';
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginFormComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    APP_PROVIDERS
  ]
})
export class AppModule { }

