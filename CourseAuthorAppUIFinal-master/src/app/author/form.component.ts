import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthorService } from './author.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  authorForm:FormGroup;
  authorIdSubscription:Subscription;
  authorId:number;

  constructor(private authorService:AuthorService, private fb:FormBuilder,
              private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.authorForm = this.fb.group({
      authorName:this.fb.control('',[Validators.required]),
      authorCity:this.fb.control('',[Validators.required]),
    })

  this.authorIdSubscription = this.activatedRoute.params.subscribe((params) => {
    if(params['authorId'] !== undefined){

      this.authorService.getAuthor(parseInt(params['authorId'])).subscribe(response => {
        let author = response.json();
        this.authorId=author.authorId;
        this.authorForm.setValue({
          authorName:author.authorName,
          authorCity:author.authorCity
        });
      }, error => console.log(error.json()));
    }
  });

  }  

  ngOnDestroy() {
    this.authorIdSubscription.unsubscribe();
  }

  get AuthorName(){
    return this.authorForm.get('authorName');
  }

  handleFormSubmit(){
    console.log(this.authorForm.value);
    this.authorForm.value.authorId = this.authorId;
    this.authorService.saveAuthor(this.authorForm.value).subscribe(response => {
      console.log(response.json());
      this.authorForm.reset();
      this.router.navigate(['/author/list1']);
    }, error => console.log(error.json()));

console.log(this.authorForm.value);
  }
}
