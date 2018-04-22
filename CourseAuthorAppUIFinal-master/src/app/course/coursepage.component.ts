import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';

@Component({
  selector: 'app-coursepage',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class CoursepageComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
