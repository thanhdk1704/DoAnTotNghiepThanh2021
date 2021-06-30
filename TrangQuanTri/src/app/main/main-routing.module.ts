import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { SanphamComponent } from './sanpham/sanpham.component';



const routes: Routes = [
    {path:'', component:MainComponent,children:
    [
      {path:'dashboard',component:DashboardComponent},
      {path:'thong-ke',loadChildren:()=>import('./thongke/thongke.module').then(x=>x.ThongkeModule)},
      {path:'shop',loadChildren:()=>import('./shop/shop.module').then(x=>x.ShopModule)},
  {path:'don-hang',loadChildren:()=>import('./donhang/donhang.module').then(x=>x.DonhangModule)},
   {path:'san-pham',loadChildren:()=>import('./sanpham/sanpham.module').then(x=>x.SanphamModule)},
   {path:'khach-hang',loadChildren:()=>import('./khachhang/khachhang.module').then(x=>x.KhachhangModule)},
   {path:'nhap-hang',loadChildren:()=>import('./nhaphang/nhaphang.module').then(x=>x.NhaphangModule)},   
   {path:'nha-cung-cap',loadChildren:()=>import('./nhacungcap/nhacungcap.module').then(x=>x.NhacungcapModule)}               
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
