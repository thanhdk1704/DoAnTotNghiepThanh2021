import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { SanphamComponent } from './sanpham.component';
import { KiemkhoComponent } from './kiemkho/kiemkho.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
const routes:Routes=[
  {path:'',component:SanphamComponent},
  {path:'kiem-kho',component:KiemkhoComponent}
]

@NgModule({
  declarations: [KiemkhoComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),LayoutsModule
  ]
})
export class SanphamModule { }
