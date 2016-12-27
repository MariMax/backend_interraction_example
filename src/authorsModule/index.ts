import { NgModule } from '@angular/core';
import { CoreModule, ApiService } from '../coreModule';
import { AuthorsComponent } from './authors.component';
import { AuthorsService } from './authors.service';

@NgModule({
  declarations: [
    AuthorsComponent,
  ],
  imports: [CoreModule],
  exports: [AuthorsComponent],
  providers: [
    // ApiService, 
    // AuthorsService
    {
      provide: AuthorsService,
      useClass: AuthorsService,
      deps: [ApiService]
    }
  ]
})
export class AuthorsModule { }