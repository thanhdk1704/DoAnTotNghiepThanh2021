import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongkeComponent } from './thongke.component';
import {Routes,RouterModule} from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ThongkethangComponent } from './thongkethang/thongkethang.component';
import { ThongkenamComponent } from './thongkenam/thongkenam.component';
import { CuoiNgayComponent } from './cuoi-ngay/cuoi-ngay.component';
import { QuyComponent } from './quy/quy.component';



const routes:Routes=[
  {path:'',component:ThongkeComponent,children:[
    {path:'thang',component:ThongkethangComponent},
    {path:'bao-cao-cuoi-ngay',component:CuoiNgayComponent},
    {path:'quy',component:QuyComponent},
    {path:'nam',component:ThongkenamComponent}
  ]}
]

@NgModule({
  declarations: [ThongkeComponent, ThongkethangComponent, ThongkenamComponent, CuoiNgayComponent, QuyComponent],
  imports: [
    CommonModule,LayoutsModule,RouterModule.forChild(routes)
  ]
})
export class ThongkeModule { }
