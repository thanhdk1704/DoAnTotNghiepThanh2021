import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/services/base.component';
declare var $: any;
@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhacungcapComponent extends BaseComponent implements OnInit {
response:any;index:any;size:any;tenncc:any;nccs:any;ncc:any;totalRecords:any;
public formdata:any;loais:any;
public doneSetupForm:any;showUpdateModal:any;isCreate:any;
  constructor(private fb:FormBuilder,injector:Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.index=1;this.size=20;
    if(!this.tenncc) this.tenncc='abc';
   
      this._api.get('api/QLNCC_HXS/search/'+this.index+'/'+this.size+'/'+this.tenncc).takeUntil(this.unsubscribe).subscribe(res => {
        this.response = res;
        this.nccs=this.response.data;
        this.totalRecords=this.response.totalItems;

    
    }, err => { });
this.getAllLoai();
  }
loadPage(page){
  if(!this.tenncc) this.tenncc='abc';
  this._api.get('api/QLSanPham/all-by-shop/emarket-shop/'+page+'/'+this.size+'/'+this.tenncc)
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.response = res;
      this.nccs=this.response.data;
      this.totalRecords=this.response.totalItems;
  });
}
detail(link){
  this.doneSetupForm = false;
  this.showUpdateModal = true; 
  this.isCreate = false;
  setTimeout(() => {
    $('#NCCModal').modal('toggle');
    this._api.get('api/QLNCC_HXS/detail/'+link)
    .takeUntil(this.unsubscribe).subscribe(res => {
      this.ncc=res; 
      // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'tenNCC': [this.ncc.tenNCC, Validators.required],
          'diaChi': [this.ncc.diaChi, Validators.required],
          'sdt': [this.ncc.sdt,Validators.required],
          'maLoai': [this.ncc.maLoai],
          'moTa': [this.ncc.moTa],
          'ghiChu': [this.ncc.ghiChu]
        }); 
        this.doneSetupForm = true;
      }); 
  }, 700);

  
}
getAllLoai(){
  this._api.get('api/Loai/all-with-children')
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.loais=res;
  });
}
}
