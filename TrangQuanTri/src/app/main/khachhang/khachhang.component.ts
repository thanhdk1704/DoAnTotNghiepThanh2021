import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent extends BaseComponent implements OnInit {
  index:any;
  size:any;
  val:any;
  khachs:any;
  total:any;
  constructor(injector:Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.index=1;this.size=20;
    this.khachs=[];
    this.total=0;
      this._api.get('api/QLKhachHang/full/'+this.index+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
      this.val = res;
      this.khachs=this.val.data;
      this.total=this.val.totalItems;
    
    }, err => { });
  }
  loadPage(page){
    this._api.get('api/QLKhachHang/full/'+page+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
      this.val = res;
      this.khachs=this.val.data;
      this.total=this.val.totalItems;

    }, err => { });
  }
}
