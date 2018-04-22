import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authordetail',
  template: `
    <p>
      Author Id of the selected author is {{authorId}} <br>
      Author Name of the selected author is {{authorName}}
    </p>
     `,
  styles: []
})
export class AuthordetailComponent implements OnInit {

  authorId:number;
  authorName:String;
  authorIdSubscription:Subscription;

  constructor(private ac:ActivatedRoute) {
      this.authorIdSubscription = this.ac.params.subscribe(params =>{
        this.authorId = params['authorId'];
        this.authorName = params['authorName'];
      })
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.authorIdSubscription.unsubscribe();
  }

}
