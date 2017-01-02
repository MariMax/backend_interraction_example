import { NgModule } from '@angular/core';
import { CoreModule, ApiService } from '../coreModule';
import { CoursesComponent } from './courses.component';
import { CourseService } from './course.service';

@NgModule({
    declarations: [
        CoursesComponent
    ],
    imports: [CoreModule],
    exports: [CoursesComponent],
    providers: [CourseService],
})
export class CoursesModule { }