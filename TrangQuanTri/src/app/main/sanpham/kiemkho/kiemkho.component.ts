import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-kiemkho',
  templateUrl: './kiemkho.component.html',
  styleUrls: ['./kiemkho.component.css']
})
export class KiemkhoComponent extends BaseComponent implements OnInit {
  response:any;index:any;size:any;mashop:any;
  kiemkhos:any;kiemkho:any;totalRecords:any;
  constructor(injector:Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.mashop='emarket-shop';
    this.index=1;this.size=12;
    this.getByShop(this.mashop,this.index,this.size);
  }
getByShop(mashop,index,size){
  this._api.get('api/QLKiemKho/all-by-shop/'+mashop+'/'+index+'/'+size).takeUntil(this.unsubscribe).subscribe(res => {
    this.response = res;
    this.kiemkhos=this.response.data;
    this.totalRecords=this.response.totalItems;
    setTimeout(() => {
      this.loadScripts();
    },);
}, err => { });
}
loadPage(page){
  
  this._api.get('api/QLKiemKho/all-by-shop/'+this.mashop+'/'+page+'/'+this.size)
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.response = res;
    this.kiemkhos=this.response.data;
    this.totalRecords=this.response.totalItems;
  });
}
getByID(id){
  this._api.get('api/QLKiemKho/detail/'+id).takeUntil(this.unsubscribe).subscribe(res => {
    this.kiemkho = res;
}, err => { });
}
}
