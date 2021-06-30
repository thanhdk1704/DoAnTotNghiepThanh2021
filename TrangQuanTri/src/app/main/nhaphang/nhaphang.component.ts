import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
declare var $: any;
@Component({
  selector: 'app-nhaphang',
  templateUrl: './nhaphang.component.html',
  styleUrls: ['./nhaphang.component.css']
})
export class NhaphangComponent extends BaseComponent  implements OnInit {
response:any;hoadonnhaps:any;totalRecords:any;
hoadonnhap:any;
index:any; size:any;
  constructor(injector:Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.index=1;this.size=20;

      this._api.get('api/QLNhapHang/all-by-shop/emarket-shop/'+this.index+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
        this.response = res;
        this.hoadonnhaps=this.response.data;
        this.totalRecords=this.response.totalItems;

    
    }, err => { });
  }
loadPage(page){
  this.size=20;

      this._api.get('api/QLNhapHang/all-by-shop/emarket-shop/'+page+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
        this.response = res;
        this.hoadonnhaps=this.response.data;
        this.totalRecords=this.response.totalItems;

    
    }, err => { });
}
detail(mahdn){
  this._api.get('api/QLNhapHang/by-id/'+mahdn).takeUntil(this.unsubscribe).subscribe(res => {
    this.hoadonnhap=res;
    $('#cthdnModal').modal('toggle');
}, err => { });
}
}
