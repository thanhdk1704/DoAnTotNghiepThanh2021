import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/services/base.component';
declare var $: any;

@Component({
  selector: 'app-thongkenam',
  templateUrl: './thongkenam.component.html',
  styleUrls: ['./thongkenam.component.css']
})
export class ThongkenamComponent extends BaseComponent implements OnInit {
  listYearPicker = [];
  //this year and last year data
  thisyear: any; lastyear: any;
  //static var
  mashop: any; nam: any; type: any; options: any;
  //comparison
  tyledoanhthu: any; tyleloinhuan: any; tyledonhang: any;
  doanhThuLoai2: any;
  doanhThuLoaiChiTiet: any;
  yearPickerForm: any;
  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.yearPickerForm = this.fb.group(
      {
        'yearPicker': ['']
      }
    );
    let tg = new Date();
    let lastFiveYear = tg.getFullYear() - 5;
    for (let i = tg.getFullYear(); i > lastFiveYear; i--) {
      this.listYearPicker.push(i);
    }

    this.type = "PieChart";
    this.options = { is3D: true }
    this.thisyear = [];
    this.lastyear = [];
    this.mashop = 's0001';
    this.nam = this.yearPickerForm.get('yearPicker') && this.yearPickerForm.get('yearPicker').value.trim() != '' ? parseInt(this.yearPickerForm.get('yearPicker').value.trim()) : tg.getFullYear();
    this.thisYear(this.mashop, this.nam);
  }
  doanhthutheoloai(arr: any) {
    let tg = [];
    arr.forEach(element => {
      let t = [element.tenLoai, Number.parseInt(element.income)]
      tg.push(t);
    });
    return tg;
  }
  thisYear(mashop, year) {
    this.thisyear.chiphinhap = 0;
    this._api.get('api/thongke/nam/' + this.mashop + '/' + year).takeUntil(this.unsubscribe).subscribe(res => {
      this.thisyear.data = res;
      this.thisyear.donvixuat = this.thisyear.data.totalAmount;
      this.thisyear.doanhthu = this.thisyear.data.totalValue;
      this.thisyear.doanhthuloai = this.thisyear.data.incomebycates;
      this.thisyear.spbanchay = this.thisyear.data.spbanchay;
      this.thisyear.dsdonhang = this.thisyear.data.dsdh;
      this.thisyear.tysuatloai = this.doanhthutheoloai(this.thisyear.doanhthuloai);

      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    this.doanhThuTheoLoai2(year);
    this.lastYear(mashop, year);
  }
  lastYear(mashop, curryear) {
    this.lastyear = [];
    this.lastyear.chiphinhap = 0;
    this._api.get('api/thongke/nam/' + mashop + '/' + (curryear-1)).takeUntil(this.unsubscribe).subscribe(res => {
      this.lastyear.data = res;
      this.lastyear.donvixuat = this.lastyear.data.totalAmount;
      this.lastyear.doanhthu = this.lastyear.data.totalValue;
      this.lastyear.doanhthuloai = this.lastyear.data.incomebycates;
      this.lastyear.spbanchay = this.lastyear.data.spbanchay;
      this.lastyear.dsdonhang = this.lastyear.data.dsdh;
      this.lastyear.tysuatloai = this.doanhthutheoloai(this.lastyear.doanhthuloai);


    }, err => { });
  }
  xemchitietloai(maLoai, bangDoanhThu: any) {
    $('#DoanhThuModal').modal('toggle');

    var kq = bangDoanhThu.filter(x => x.loai != null && x.loai.maLoai == maLoai);
    console.log(kq);
    this.doanhThuLoaiChiTiet = kq;
  }

  doanhThuTheoLoai2(year) {
    this._api.get('api/ThongKe/doanh-thu-loai/' + 's0001' + '/' + year)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.doanhThuLoai2 = res;

      });
  }

  sumSameCategory(categoryList) {

  }

  sumAll(arr) {
    var sum = 0;
    for (let i of arr) {
      sum += i.doanhThu;
    }
    return sum;
  }
}