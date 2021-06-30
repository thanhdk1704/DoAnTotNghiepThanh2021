import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonhangComponent } from './donhang.component';
import  {Routes,RouterModule} from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
const routes:Routes=[
  {path:'',component:DonhangComponent}
]

@NgModule({
  declarations: [DonhangComponent],
  imports: [
    CommonModule,LayoutsModule,RouterModule.forChild(routes)
  ]
})
export class DonhangModule { }
