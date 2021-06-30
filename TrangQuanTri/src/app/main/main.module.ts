import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { ShopModule } from './shop/shop.module';
import { DonhangModule } from './donhang/donhang.module';
import { SanphamComponent } from './sanpham/sanpham.component';
import { KhachhangModule } from './khachhang/khachhang.module';
import { NhaphangModule } from './nhaphang/nhaphang.module';


@NgModule({
  declarations: [
    DashboardComponent,MainComponent,
    NavbarComponent,SidebarComponent,SanphamComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    LayoutsModule,
    SanphamModule,
    ShopModule,
    DonhangModule,
    KhachhangModule,NhaphangModule

  ]
})
export class MainModule { }
