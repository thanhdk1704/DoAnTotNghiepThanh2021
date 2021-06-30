import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhaphangComponent } from './nhaphang.component';
import { ThemphieunhapComponent } from './themphieunhap/themphieunhap.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
const routes:Routes=[
  {path:'',component:NhaphangComponent},
  {path:'new',component:ThemphieunhapComponent}
]


@NgModule({
  declarations: [NhaphangComponent, ThemphieunhapComponent],
  imports: [
    CommonModule,LayoutsModule,RouterModule.forChild(routes)
  ]
})
export class NhaphangModule { }
