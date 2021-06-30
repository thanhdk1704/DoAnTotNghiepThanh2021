import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../services/base.component';
declare var $ :any;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent extends BaseComponent implements  OnInit {
  wishlistitems:any;
  total:any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this._wishlist.items.subscribe((res) => {
      this.wishlistitems = res;
      this.total = 0;
     this.total=this.wishlistitems.length;
    });setTimeout(() => {
      this.loadScripts();
    },);
  } 
  clearwishlist() { 
    this._wishlist.clearWishlist();
    alert('Xóa thành công');
  }
  addToCart(it) { 
    this._cart.addToCart(it);
    this._wishlist.deleteItem(it);
    alert('Thêm thành công!'); 
    
  }
  deleteItem(item){
    this._wishlist.deleteItem(item);
    //// sau khi theem vao gio hang thisang trang gio hang ok? lam sau
  
  }
  
}