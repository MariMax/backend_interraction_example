import { Injectable } from '@angular/core';
import { ApiService } from '../coreModule/services/api.service';
import { Observable, Observer } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  owner: string;
  authors: Array<string>;
  date: Date;
}

@Injectable()
export class CourseService {
  coursesObserver: Observer<Array<Object>>;
  coursesObservervable: Observable<Array<Course>>;
  courses: Array<Course> = [];
  constructor(private api: ApiService) {
    this.coursesObservervable = Observable.create(observer => this.coursesObserver = observer);
  }

  subscribeCourses() {
    return this.coursesObservervable;
  }

  getCourses(force: boolean = false) {
    if (this.courses.length && !force) {
      this.coursesObserver.next(this.courses);
    }
    this.api.get(`/course`)
      .map(response => response.items)
      .do(courses => this.courses = courses)
      .do(courses => console.log(courses, this.courses))
      .do(() => this.coursesObserver.next(this.courses))
      .subscribe(() => { }, (e) => this.coursesObserver.error(e))
  }

  createCourse(course: Course) {
    this.api.post(`/course`, course)
      .do(course => this.courses = [...this.courses, course])
      .do(courses => console.log(courses, this.courses))
      .do(() => this.coursesObserver.next(this.courses))
      .subscribe(() => { }, (e) => this.coursesObserver.error(e));
  }

  removeCourse(id) {
    this.api.delete(`/course?id=${id}`)
      .do(() => this.courses = this.courses.filter(i => i.id !== id))
      .do(courses => console.log(courses, this.courses))
      .do(() => this.coursesObserver.next(this.courses))
      .subscribe(() => { }, (e) => this.coursesObserver.error(e))
  }

  updateCourse(course: Course) {
    this.api.put(`/course`, course)
      .do(course => {
        this.courses = this.courses.filter(i => i.id !== course.id);
        this.courses = [...this.courses, course];
      })
      .do(courses => console.log(courses, this.courses))
      .do(() => this.coursesObserver.next(this.courses))
      .subscribe(() => { }, (e) => this.coursesObserver.error(e));
  }
}