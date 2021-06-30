import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhachhangComponent } from './khachhang.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
const routes:Routes=[
  {path:'',component:KhachhangComponent}
]


@NgModule({
  declarations: [KhachhangComponent],
  imports: [
    CommonModule,LayoutsModule,RouterModule.forChild(routes)
  ]
})
export class KhachhangModule { }
