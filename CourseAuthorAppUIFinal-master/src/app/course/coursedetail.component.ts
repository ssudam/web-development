import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coursedetail',
  template: `
    <p>
      The courseId for the selected course is {{courseId}}
    </p>
  `,
  styles: []
})
export class CoursedetailComponent implements OnInit, OnDestroy {

  courseId:String;
  courseIdSubscription:Subscription;

  constructor(private ac:ActivatedRoute) {
    //this.courseId = this.ac.snapshot.params['courseId'];
    this.courseIdSubscription = this.ac.params.subscribe(params =>{
        this.courseId = params['courseId'];
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.courseIdSubscription.unsubscribe();
  }

}
