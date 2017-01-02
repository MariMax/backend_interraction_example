import { NgModule } from '@angular/core';
import { CoreModule } from '../coreModule';

// App is our top level component
import { LoginFormComponent } from '../loginForm';
import { AppComponent } from './app.component';
import { AuthorsModule } from '../authorsModule';
import { CoursesModule } from '../coursesModule';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginFormComponent,
  ],
  imports: [
    CoreModule.forRoot(),
    AuthorsModule,
    CoursesModule,
  ]
})
export class AppModule { }

