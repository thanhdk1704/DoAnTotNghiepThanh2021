import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-themphieunhap',
  templateUrl: './themphieunhap.component.html',
  styleUrls: ['./themphieunhap.component.css']
})
export class ThemphieunhapComponent extends BaseComponent implements OnInit {
  response:any;
  allsp:any;
  tong:any;
  list_ij:any;
  list_ij_sum:any;
  Cost:any;
  today=new Date();
  nccs:any;
  strtoday:any;
  index:any;
  size:any;
  tongdanhmuc:any;
  public doneSetupForm:any;
  public formdata:any;
  public submitted=false;
  constructor(private fb: FormBuilder,private router:Router,injector:Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this.index=1;this.size=20;
    this.strtoday=(this.today.getDay()+1)+'/'+(this.today.getMonth()+1)+'/'+this.today.getFullYear();
    this._api.get('api/QLSanPham/all-by-shop/emarket-shop/'+this.index+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      this.allsp=this.response.data;
      this.tong=this.response.totalItems;
 this.loadlist_item();
 this.allNCC();
 
  });
}
loadlist_item(){
  this._iventoryreceiving.items.subscribe((res) => {
    this.list_ij = res;
    this.list_ij_sum=0;
    this.Cost = 0;
    for(let x of this.list_ij){
      x.money=0; 
      x.money = x.quantity * x.kho.giaNhap;
      this.Cost += x.quantity * x.kho.giaNhap;
      this.list_ij_sum+=Number.parseInt(x.quantity);
    } 
    this.tongdanhmuc=this.list_ij.length;
  });
}
loadPage(page){
  
  this._api.get('api/QLSanPham/all-by-shop/emarket-shop/'+page+'/'+this.size)
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.response = res;
      this.allsp=this.response.data;
      this.tong=this.response.totalItems;
  });
}
addToList(item){
this._iventoryreceiving.addtoList(item);
}
removeItem(item){
  this._iventoryreceiving.deleteItem(item.maSanPham);
}
removeAll(){
  if(confirm('b???n c?? mu???n x??a to??n b??? danh s??ch kh??ng?'))
  this._iventoryreceiving.removeAllItems();
}
changeQuantity(quantity,item){
  if(quantity<=0){
    if(confirm('b???n c?? mu???n x??a s???n ph???m n??y kh??ng?')){
      this.removeItem(item);
    }
    else this.changeQuantity(1,item);
  }
   else{
      item.quantity =  quantity;
      item.money = item.quantity *  item.kho.giaNhap;
      this._iventoryreceiving.addQty(item);
    }
  }
  get f() { return this.formdata.controls; }
  formThem(){
    this.doneSetupForm = false;
    setTimeout(() => {
      this.formdata = this.fb.group({
      'maNCC': ['', Validators.required],
    });this.doneSetupForm = true;
    this.submitted=false;
    }, );
    
 
  }
      kiemTra(){
      $('#kiemTraHDN').modal('toggle');
      this.formThem();
            }
      allNCC(){
        this._api.get('api/QLNhapHang/get-all-ncc')
        .takeUntil(this.unsubscribe).subscribe(res => {
         this.nccs=res;
        });
      }
      Submit(value){
       
        this.submitted=true;
        
        if (this.formdata.invalid||this.list_ij==[]||this.list_ij==null||this.list_ij.length==0)
         { this.submitted=false;
          return alert('D??? li???u kh??ng ????ng, vui l??ng ki???m tra l???i');
         
        }let tg=[]; this.list_ij.forEach(element => {
          let item={
            "maSanPham":element.maSanPham,
            "tenSanPham":element.tenSanPham,
            "anh":element.anh,
            "link":element.link,
            "soLuong":Number.parseInt(element.quantity),
            "donGia":Number.parseInt(element.kho.giaNhap)
          }
          tg.push(item);
        });
        
        
        let tmp = {
          
        maNCC:value.maNCC,
        maShop:'S0001',
       chitiet:tg
       
         };console.log(tg);
         this._api.post('api/QLNhapHang/them',tmp).takeUntil(this.unsubscribe).subscribe(res => {
           debugger;
           console.log(res);
           console.log(tmp);
          alert('???? th??m phi???u nh???p');
          this._iventoryreceiving.removeAllItems();
          $('#kiemTraHDN').closest('.modal').modal('hide');
          this.router.navigate(['/main/nhap-hang'])
          });
      }
          }
