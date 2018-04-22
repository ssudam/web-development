import { RouterModule } from '@angular/router';
import { AuthorpageComponent } from './authorpage.component';
import { AuthorlistComponent } from './authorlist.component';
import { AuthordetailComponent } from './authordetail.component';
import { FormComponent } from './form.component';

export const AUTHOR_ROUTES = RouterModule.forChild([
    {path:'', component:AuthorpageComponent},
    {path:'', component:AuthorpageComponent, children: [
        {path:'form', component:FormComponent},
        {path:'form/:authorId', component:FormComponent},
        {path:'list1', component:AuthorlistComponent},
       // {path:'list1', component:AuthorlistComponent, children: [
        {path:'list1/detail/:authorId/:authorName', component:AuthordetailComponent}
       // ]}
    ]}
])