import { RouterModule } from '@angular/router';
import { CoursepageComponent } from './coursepage.component';
import { CourselistComponent } from './courselist.component';
import { CoursedetailComponent } from './coursedetail.component';
import { FormComponent } from './form.component';


export const COURSE_ROUTES = RouterModule.forChild([
    {path:'', component:CoursepageComponent},
    {path:'', component:CoursepageComponent, children: [
        {path:'form', component:FormComponent},
        {path:'form/:courseId', component:FormComponent},
        {path:'list', component:CourselistComponent},
      //  {path:'list', component:CourselistComponent, children: [
            {path:'detail/:courseId', component:CoursedetailComponent}
        ]}
   // ]},
]);