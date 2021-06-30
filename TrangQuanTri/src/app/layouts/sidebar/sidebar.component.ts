import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent implements OnInit {

  constructor(injector:Injector) {
    super(injector);
  }
menus:any;
  ngOnInit(): void {
    this.menus=[
      {
        'name':'Quản lý sản phẩm','action':'qlsp','icon':'lnr-laptop-phone','children':
        [
          {'ten':'Danh Sách','link':'san-pham'},
         
          {'ten':'Kiểm kho','link':'san-pham/kiem-kho'}
        ]
      },
      {
        'name':'Đối tác','action':'doitac','icon':'lnr lnr-dice','children':
        [
          {'ten':'Nhà cung cấp','link':'nha-cung-cap'},
          {'ten':'Khách hàng','link':'khach-hang'},
      
        ]
      },
      {
        'name':'Quản lý đơn hàng','action':'qldh','icon':'lnr lnr-dice','children':
        [
          {'ten':'Danh Sách','link':'don-hang'},
          {'ten':'Thêm đơn mới','link':'them-don-hang'},
        ]
      },
      {
        'name':'Quản lý nhập hàng','action':'qlnh','icon':'lnr lnr-file-empty','children':
        [
          {'ten':'Danh Sách','link':'nhap-hang'},
          {'ten':'Thêm phiếu nhập','link':'nhap-hang/new'},
          {'ten':'Trả Hàng nhập','link':'nhap-hang/tra-hang-nhap'}
        ]
      },
      {
        'name':'Thống kê','action':'tkbc','icon':'lnr lnr-chart-bars','children':
        [
          {'ten':'Báo cáo cuối ngày','link':'thong-ke/bao-cao-cuoi-ngay'},
          {'ten':'Báo cáo tháng','link':'thong-ke/thang/'},
          {'ten':'Báo cáo quý','link':'thong-ke/quy/'},

          {'ten':'Tổng kết năm','link':'thong-ke/nam'}
        ]
      },
    ]
    this.loadScripts();
  }

}
