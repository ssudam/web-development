import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorpageComponent } from './authorpage.component';
import { AuthorlistComponent } from './authorlist.component';
import { AuthordetailComponent } from './authordetail.component';
import { AuthorService } from './author.service';
import { AUTHOR_ROUTES } from './author.routing';
import { FormComponent } from './form.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AUTHOR_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [ AuthorpageComponent ],
  providers: [ AuthorService ],
  declarations: [AuthorpageComponent, AuthorlistComponent, AuthordetailComponent, FormComponent]
})
export class AuthorModule { }
