import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { BaseComponent } from '../services/base.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent extends BaseComponent implements OnInit {
  searchResponse: any;
  searchResult: any;
  spResults: any;
  tongsl1: any;
  keyWord: any;
  index: any;
  size: any;
  danhMuc: any;
  minPrice: any; maxPrice: any;
  lowToHighPrice: any;
  allLoai: any;
  @Input() searchMember: any;
  constructor(private injector: Injector) {
    super(injector);
    this.searchResult = JSON.parse(localStorage.getItem('searchResult')) ? JSON.parse(localStorage.getItem('searchResult')) : null;
  }

  ngOnInit(): void {
    this.index = 1;
    this.size = 25;
    this.getAllLoai();
    this.renderSearchResult();
    setTimeout(() => {
      this.loadScripts();
    }, );
    

  }

  filterSearchResult(filterCondition) {
    switch (parseInt(filterCondition)) {
      case 0: {
      }
      case 1: {
        this.lowToHighPrice = false;
      }
      case 2: {
        this.lowToHighPrice = true;
      }
      default: {
        break;
      }
    }
    this.loadPage(1);
  }
  renderSearchResult() {

    if (localStorage.getItem('searchResult')) {
      this.spResults = this.searchResult.data;
      this.tongsl1 = this.searchResult.total;
      this.keyWord = this.searchResult.keyWord;
      this.minPrice = this.searchResult.minPrice;
      this.maxPrice = this.searchResult.maxPrice;
      this.danhMuc = this.searchResult.danhMuc;
      this.lowToHighPrice = this.searchResult.lowToHighPrice
    }
    else {
      this.searchResult = 'Empty';
    }
    console.log(this.searchResult);
  }
  loadPage(page) {
    let result = this._api.get('api/QLSanPham' + '/search/result/' + this.keyWord + '/' + '%20' + '/' + this.danhMuc + '/' + '%20' + '/' + '%20' + '/' + this.minPrice + '/' + this.maxPrice + '/' + page + '/' + 24 + '/' + (this.lowToHighPrice ? this.lowToHighPrice : ''))
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.searchResponse = res;
        this.spResults = this.searchResponse.data;
        this.tongsl1 = this.searchResponse.totalItems;

      });
  }

  getAllLoai() {
    this._api.get('api/Loai/all-with-children').takeUntil(this.unsubscribe).subscribe(dau => {
      this.allLoai = dau;

    });
  }
  addToCart(item) {
    this._cart.addToCart(item);
    alert('đã thêm vào giỏ hàng');

  }

  addToWishlist(item) {
    this._wishlist.addToWishlist(item);
    alert('đã thêm vào danh sách yêu thích');
  }
}
