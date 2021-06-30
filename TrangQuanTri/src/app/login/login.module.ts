import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResigterComponent } from './resigter/resigter.component';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'resigter',component:ResigterComponent},
  {path:'',redirectTo:'main/dashboard'}
]

@NgModule({
  declarations: [ResigterComponent],
  imports: [
    CommonModule,FormsModule,RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
