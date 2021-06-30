import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ShopComponent } from './shop.component';
import {Routes,RouterModule} from '@angular/router';
const routes:Routes=[
  {path:'',component:ShopComponent}
]

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,LayoutsModule
  ]
})
export class ShopModule { }
