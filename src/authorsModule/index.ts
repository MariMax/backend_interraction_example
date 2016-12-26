import { NgModule } from '@angular/core';
import { CoreModule } from '../coreModule';
import { AuthorsComponent } from './authors.component';
import { ApiService } from '../coreModule/services/api.service';
import { AuthorsService } from './authors.service';

@NgModule({
  declarations: [
    AuthorsComponent,
  ],
  imports: [CoreModule],
  exports: [AuthorsComponent],
  providers: [
    {
      provide: AuthorsService,
      useFactory: (apiService) => new AuthorsService(apiService),
      deps: [ApiService]
    }
  ]
})
export class AuthorsModule { }