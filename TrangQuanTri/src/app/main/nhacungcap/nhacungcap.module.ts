import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhacungcapComponent } from './nhacungcap.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
const routes:Routes=[
  {path:'',component:NhacungcapComponent}
]


@NgModule({
  declarations: [NhacungcapComponent],
  imports: [
    CommonModule,LayoutsModule,RouterModule.forChild(routes)
  ]
})
export class NhacungcapModule { }
