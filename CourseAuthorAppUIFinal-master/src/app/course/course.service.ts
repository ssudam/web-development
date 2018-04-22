import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 


@Injectable()
export class CourseService {
  URL:string = "http://localhost:8080/course";

  private CourseList:Array<Course> = [];

  constructor(private http:Http) { }

  public getCourses(){
      return this.http.get(this.URL)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  getCourse(courseId:number){
    
    return this.http.get(this.URL+"/"+courseId)

  }

  deleteCourse(courseId:number){
    return this.http.delete(this.URL+"/"+courseId);
  }

  saveCourse(course:Course){
     let rheader=new Headers();
      rheader.set("content-type","application/json");
      if(course.courseId===undefined){
        console.log(course.courseName);
        return this.http.post(this.URL,JSON.stringify(course),{headers:rheader})
      }
      else{
        return this.http.put(this.URL,JSON.stringify(course),{headers:rheader});
      }
    }
  }


