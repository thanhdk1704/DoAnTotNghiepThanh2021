import { Component, Injector, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { Observable, Subject, of, from } from 'rxjs'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Output() searchKeys = new EventEmitter();
  menus: any;
  today: any;
  total_p: any;
  total_w: any;
  cart_items: any;
  list_item: any;
  totalRecords: any;
  account: any;
  tf: any;
  private searchResponse: any;
  public formSearch: any;
  constructor(injector: Injector, private router: Router, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.tf = true;
    this.formSearch = this.fb.group({
      'keyWord': [''],
      'loai': [''],
    });
    this._api.get('api/Loai/all-with-children').takeUntil(this.unsubscribe).subscribe(dau => {
      this.menus = dau;
     
    });
    this._cart.items.subscribe((res) => {
      this.cart_items = res;
      this.total_p = 0;
      for (let x of this.cart_items) {
        x.money = Number.parseInt(x.quantity) * Number.parseInt(x.giahientai.gia);
        this.total_p += x.quantity * x.giahientai.gia;
      }
    }); console.log(this.tf);
    this._wishlist.items.subscribe((res) => {
      let wishlist = res;
      this.total_w = wishlist.length;

    });
    this.taiKhoan();
  }

  search() {
    let keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';
    let maloai = this.formSearch.get('loai') && this.formSearch.get('loai').value.trim() != '' ? parseInt(this.formSearch.get('loai').value) : 0;
    console.log(maloai);
    
    let result = this._api.get('api/QLSanPham' + '/search/result/' + keyWord + '/' + '%20' + '/' + maloai + '/' + '%20' + '/' + '%20' + '/' + 0 + '/' + 0 + '/' + 1 + '/' + 24)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.searchResponse = res;
        this.list_item = this.searchResponse.data;
        this.totalRecords = this.searchResponse.totalItems;
        var searchResult = {
          keyWord: keyWord,
          danhMuc: maloai,
          data: this.list_item,
          total: this.totalRecords,
          minPrice: 0,
          maxPrice: 0,
          lowToHighPrice: null,
        }     
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
        window.location.replace("http://localhost:4200/search/result");
      });

  }

  taiKhoan() {
    this._login.items.subscribe((res) => {
      this.account = res;

    });
  }

  logout() {
    this._login.logOut();
    alert('đã đăng xuất');
    window.location.replace('');
  }
  
  deleteItem(item) {
    this._cart.deleteItem(item.maSanPham);
  }
}