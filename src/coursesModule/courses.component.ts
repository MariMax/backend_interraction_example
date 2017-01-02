import { Component, ViewEncapsulation } from '@angular/core';
import { CourseService, Course } from './course.service';
import { AuthService } from '../coreModule/services/auth.service';
import { AuthorsService, Author } from '../authorsModule/authors.service';
import { Observable, Subscription } from 'rxjs';
const loremIpsum = require('lorem-ipsum');

@Component({
  selector: 'courses',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [
    './styles.css',
  ],
  host: {
    style: `flex:1`
  },
  template: require('./template.html'),
})
export class CoursesComponent {
  coursesSubscription: Subscription;
  authorsSubscription: Subscription;
  courses: Array<Course> = [];
  authors: Array<Author> = [];
  constructor(
    private courseService: CourseService,
    private authorsService: AuthorsService,
    private authServide: AuthService,
  ) { }

  ngOnInit() {
    this.coursesSubscription = this.courseService.subscribeCourses()
      .subscribe(courses => this.courses = courses, e => console.error(e));
    this.authorsSubscription = this.authorsService.getAuthorsObservable()
      .subscribe(authors => this.authors = authors, e => console.error(e));
  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
    this.authorsSubscription.unsubscribe();
  }

  getRandomNumer(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getCourses() {
    this.courseService.getCourses();
  }

  addCourse() {
    this.courseService.createCourse({
      id: null,
      owner: null,
      title: loremIpsum({
        count: 1,
        units: 'words',
        format: 'plain',
        random: Math.random,
      }),
      date: new Date(),
      duration: (Math.random() * 100)|0,
      description: loremIpsum({
        count: 5,
        units: 'word',
        format: 'plain',
        random: Math.random,
      }),
      authors: this.authors.length
        ? [this.authors[this.getRandomNumer(0, this.authors.length)].id]
        : []
    })
  }

  updateCourse() {
    if (!this.courses.length) {
      return console.error(`there is nothing to update`);
    }

    let course = this.courses[this.getRandomNumer(0, this.courses.length)];
    const newCourse = {
      ...course,
      title: loremIpsum({
        count: 1,
        units: 'word',
        format: 'plain',
        random: Math.random,
      }),
      duration: (Math.random() * 100)|0,
      description: loremIpsum({
        count: 5,
        units: 'word',
        format: 'plain',
        random: Math.random,
      }),
      authors: this.authors.length
        ? [this.authors[this.getRandomNumer(0, this.authors.length)].id]
        : course.authors
    };

    this.courseService.updateCourse(course);
  }

  removeCourse() {
    if (!this.courses.length) {
      return console.error(`there is nothing to remove`);
    }
    const course = this.courses[this.getRandomNumer(0, this.courses.length)];
    this.courseService.removeCourse(course.id);
  }


}