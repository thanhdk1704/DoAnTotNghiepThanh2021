import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-cuoi-ngay',
  templateUrl: './cuoi-ngay.component.html',
  styleUrls: ['./cuoi-ngay.component.css']
})


export class CuoiNgayComponent extends BaseComponent implements OnInit {

  today = new Date();
  dsDonHang:any;
  tongDoanhThu:any;
  tongDonHang:any;
  tongDonvi:any;
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
;
    this.baoCaoNgay();
  }

  public baoCaoNgay(){
    this._api.get('api/ThongKe/ngay/S0001').takeUntil(this.unsubscribe).subscribe(res=>{
      let response:any=res;
      this.dsDonHang=response.dsdh;
      this.tongDoanhThu=response.totalValue;
      this.tongDonHang=response.totalOrders;
      this.tongDonvi=response.totalAmount;
      
    });
  }
}
