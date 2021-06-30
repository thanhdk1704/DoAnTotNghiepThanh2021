import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { FileUpload } from 'primeng/fileupload';
import { element } from 'protractor';
declare var $: any;
@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent extends BaseComponent implements OnInit {
  response:any;
  loais:any;loai1s:any;loai2s:any;
list_item:any;
index:any;
size:any;
public single_item: any;
public totalRecords:any;
public pageSize = 3;
public page = 1;
public uploadedFiles: any[] = [];
public formsearch: any;
public formdata: any;
public formlsgia:any;
public doneSetupForm: any;  
public showUpdateModal:any;
public isCreate:any;
submitted = false;
@ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor( private fb: FormBuilder, injector:Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this.index=1;this.size=20;
    document.getElementById('abc').innerHTML="Sản phẩm"
      this._api.get('api/QLSanPham/all-by-shop/emarket-shop/'+this.index+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
        this.response = res;
        this.list_item=this.response.data;
        this.totalRecords=this.response.totalItems;

    
    }, err => { });
    this.getAllLoai();
  }
loadPage(page){
  
  this._api.get('api/QLSanPham/all-by-shop/emarket-shop/'+page+'/'+this.size)
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.response = res;
      this.list_item=this.response.data;
      this.totalRecords=this.response.totalItems;
  });
}
pwdCheckValidator(control){
  var filteredStrings = {search:control.value, select:'@#!$%&*'}
  var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
  if(control.value.length < 6 || !result){
      return {matkhau: true};
  }
}
get f() { return this.formdata.controls; }
createModal() {
  this.doneSetupForm = false;
  this.showUpdateModal = true;
  this.isCreate = true;
  this.single_item = null;
  setTimeout(() => {
    $('#SanphamModal').modal('toggle');
    this.formdata = this.fb.group({
      'tensanpham': ['', Validators.required],
      'maloai2': ['', Validators.required],
      'mota': [''],
      'ghichu': [''],
      'giaban': [0, Validators.required],
      'gianhap': [0, Validators.required],
      'soluong':[0],
    });
    // this.formdata.get('ngaysinh').setValue(this.today);
    // this.formdata.get('gioitinh').setValue(this.genders[0].value); 
    // this.formdata.get('role').setValue(this.roles[0].value);
    this.doneSetupForm = true;
  });
}
onSubmit(value) {
  this.submitted = true;
  if (this.formdata.invalid) {
    return;
  } 
  if(this.isCreate) { 
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      let data_image = data == '' ? null : data;
      let tmp = {
         anh:data_image,
       maLoai2:value.maloai2,
       tenSanPham:value.tensanpham,
       moTa:value.mota,
       ghiChu:value.ghichu,
       link:value.tensanpham.replace(/ /gi,"-"),
       kho:{
         maShop:'S0001',
         soLuong:Number.parseInt(value.soluong),
         giaNhap:Number.parseInt(value.gianhap)
       },
       giahientai:{
         gia:Number.parseInt(value.giaban)
       }
        };
      this._api.post('api/QLSanPham/them',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Thêm thành công');
        this.loadPage(1);
        this.closeModal();
        });
    });
  } else { 
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      let data_image = data == '' ? null : data;
      let tmp = {
         anh:data_image,
       maLoai2:value.maloai2,
       tenSanPham:value.tensanpham,
       moTa:value.mota,
       ghiChu:value.ghichu,
       link:value.tensanpham.replace(/ /gi,"-"),
       kho:{
         maShop:'S0001',
         soLuong:value.soluong,
         giaNhap:value.gianhap
       },
       giahientai:{
         gia:value.giaban
       }
        };
      this._api.post('api/QLSanPham/update',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật thành công');
        this.loadPage(1);
        this.closeModal();
        });
    });
  }
 
} 
lichSuGiaBan(sanpham){
  $('#LSgiaModal').modal('toggle');
  this._api.get('api/QLSanPham/detail/'+ sanpham.link).takeUntil(this.unsubscribe).subscribe((res:any) => {
    this.single_item = res;
    document.getElementById('titleLSG').innerHTML="Lịch sử giá của "+this.single_item.tenSanPham;
    
   });
}
getAllLoai(){
  this._api.get('api/Loai/all-with-children')
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.loais=res;
  });
}
getLoai1byLoai(maloai){
  this._api.get('api/Loai/loai1/by-loai/'+maloai)
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.loai1s=res;
  });
}
getLoai2ByLoai1(maloai1){
  this._api.get('api/Loai/loai2/by-loai1/'+maloai1)
  .takeUntil(this.unsubscribe).subscribe(res => {
    this.loai2s=res;
  });
}
xoasp(ma){
  if(confirm("bạn có muốn xóa sản phẩm?")){
  this._api.get('api/QLSanPham/xoa/'+ma)
  .takeUntil(this.unsubscribe).subscribe(res => {
    
  });}
}
reset(){
  this.single_item = null;
  this.formdata = this.fb.group({
    'tensanpham': ['', Validators.required],
    'maloai2': ['', Validators.required],
    'mota': [''],
    'ghichu': [''],
    'soluong': [0, Validators.required],
    'giaban': [0, Validators.required],
    'gianhap': [0, Validators.required]
    
  });
}
public openUpdateModal(row) {
  this.doneSetupForm = false;
  this.showUpdateModal = true; 
  this.isCreate = false;
  setTimeout(() => {
    $('#SanphamModal').modal('toggle');
    this._api.get('api/QLSanPham/detail/'+ row.link).takeUntil(this.unsubscribe).subscribe((res:any) => {
      this.single_item = res; 
      // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'tensanpham': [this.single_item.tenSanPham, Validators.required],
          'maloai2': [this.single_item.maLoai2, Validators.required],
          'mota': [this.single_item.moTa],
          'ghichu': [this.single_item.ghiChu],
          'soluong': [this.single_item.kho.soLuongCon, Validators.required],
          'giaban': [this.single_item.giahientai.gia, Validators.required],
          'gianhap': [this.single_item.kho.giaNhap, Validators.required]
        }); 
        this.doneSetupForm = true;
      }); 
  }, 700);
}
closeModal() {
  $('#SanphamModal').closest('.modal').modal('hide');
}

}
