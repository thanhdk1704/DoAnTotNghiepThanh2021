import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/services/base.component';
declare var $:any;
@Component({
  selector: 'app-quy',
  templateUrl: './quy.component.html',
  styleUrls: ['./quy.component.css']
})
export class QuyComponent extends BaseComponent implements OnInit {
  listPreciousPicker = [];
  //this precious and last precious data
  thisprecious: any; lastprecious: any;
  //static var
  mashop: any; quy: any; type: any; options: any;
  //comparison
  tyledoanhthu: any; tyleloinhuan: any; tyledonhang: any;
  doanhThuLoai2: any;
  doanhThuLoaiChiTiet: any;
  preciousPickerForm: any;
  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.preciousPickerForm = this.fb.group(
      {
        'preciousPicker': ['']
      }
    );
    let tg = new Date();
    for (let i = 4; i > 0; i--) {
      this.listPreciousPicker.push(i);
    }
    let quyHienTai=tg.getMonth()+1;
    quyHienTai=quyHienTai%3==0?quyHienTai/3:(quyHienTai-quyHienTai%3)/3+1;
    this.type = "PieChart";
    this.options = { is3D: true }
    this.thisprecious = [];
    this.lastprecious = [];
    this.mashop = 's0001';
    this.quy = this.preciousPickerForm.get('preciousPicker') && this.preciousPickerForm.get('preciousPicker').value.trim() != '' ? parseInt(this.preciousPickerForm.get('preciousPicker').value.trim()) :quyHienTai;
    this.thisPrecious(this.mashop, this.quy);
  }
  doanhthutheoloai(arr: any) {
    let tg = [];
    arr.forEach(element => {
      let t = [element.tenLoai, Number.parseInt(element.income)]
      tg.push(t);
    });
    return tg;
  }
  thisPrecious(mashop, precious) {
    this.thisprecious.chiphinhap = 0;
    this._api.get('api/thongke/quy/' + this.mashop + '/' + precious).takeUntil(this.unsubscribe).subscribe(res => {
      this.thisprecious.data = res;
      this.thisprecious.donvixuat = this.thisprecious.data.totalAmount;
      this.thisprecious.doanhthu = this.thisprecious.data.totalValue;
      this.thisprecious.doanhthuloai = this.thisprecious.data.incomebycates;
      this.thisprecious.spbanchay = this.thisprecious.data.spbanchay;
      this.thisprecious.dsdonhang = this.thisprecious.data.dsdh;
      this.thisprecious.tysuatloai = this.doanhthutheoloai(this.thisprecious.doanhthuloai);
  
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    this.doanhThuTheoLoai2(precious);
    this.lastPrecious(mashop, precious);
  }
  lastPrecious(mashop, currprecious) {
    this.lastprecious = [];
    currprecious<2 ?currprecious=4:currprecious--;
    this.lastprecious.chiphinhap = 0;
    this._api.get('api/thongke/quy/' + mashop + '/' + currprecious).takeUntil(this.unsubscribe).subscribe(res => {
      this.lastprecious.data = res;
      this.lastprecious.donvixuat = this.lastprecious.data.totalAmount;
      this.lastprecious.doanhthu = this.lastprecious.data.totalValue;
      this.lastprecious.doanhthuloai = this.lastprecious.data.incomebycates;
      this.lastprecious.spbanchay = this.lastprecious.data.spbanchay;
      this.lastprecious.dsdonhang = this.lastprecious.data.dsdh;
      this.lastprecious.tysuatloai = this.doanhthutheoloai(this.lastprecious.doanhthuloai);


    }, err => { });
  }
  xemchitietloai(maLoai, bangDoanhThu: any) {
    $('#DoanhThuModal').modal('toggle');

    var kq = bangDoanhThu.filter(x =>x.loai!=null&& x.loai.maLoai == maLoai);
    console.log(kq);
    this.doanhThuLoaiChiTiet = kq;
  }

  doanhThuTheoLoai2(precious) {
    this._api.get('api/ThongKe/doanh-thu-loai/' + 's0001' + '/' + precious)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.doanhThuLoai2 = res;
        
      });
  }

  sumSameCategory(categoryList){

  }

  sumAll(arr){
    var sum=0;
    arr.forEach(element => {
      sum+=parseInt(element.doanhThu);
    });
    return sum;
  }
}
