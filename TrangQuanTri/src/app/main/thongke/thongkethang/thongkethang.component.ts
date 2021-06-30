import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/services/base.component';
declare var $ :any;

@Component({
  selector: 'app-thongkethang',
  templateUrl: './thongkethang.component.html',
  styleUrls: ['./thongkethang.component.css']
})
export class ThongkethangComponent extends BaseComponent implements OnInit {
  //this month and last month data
  thismonth:any; lastmonth:any;
   namHienTai=new Date().getFullYear();
  //static var
  mashop:any;thang:any;type:any;  options:any;
  //comparison
  tyledoanhthu:any;tyleloinhuan:any;tyledonhang:any;
  doanhThuLoai2:any;
  monthPickerForm:any;
  listMonthPicker:any;
  doanhThuLoaiChiTiet:any;
  constructor(injector:Injector,private fb:FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.listMonthPicker=[];
    this.monthPickerForm = this.fb.group(
      {
        'monthPicker': [new Date().getMonth()+1]
      }
    );
    for (let i = 1; i <13; i++) {
      this.listMonthPicker.push(i);
    }

    this.type="PieChart";
    this.options={is3D: true}
    this.thismonth=[];
    this.lastmonth=[];

    this.mashop='s0001';let tg=new Date();
    this.thang = this.monthPickerForm.get('monthPicker') && this.monthPickerForm.get('monthPicker').value  != '' ? parseInt(this.monthPickerForm.get('monthPicker').value) : tg.getMonth()+1;
    //0 to 11
   this.thisDamnMonth(this.mashop,this.thang);
  }

  thisDamnMonth(maShop,m){
    this.thismonth.chiphinhap=0;
    this._api.get('api/thongke/thang/'+maShop+'/'+m).takeUntil(this.unsubscribe).subscribe(res => {
      this.thismonth.data = res;
      this.thismonth.donvixuat=this.thismonth.data.totalAmount;
      this.thismonth.doanhthu=this.thismonth.data.totalValue;
      this.thismonth.doanhthuloai=this.thismonth.data.incomebycates;
      this.thismonth.spbanchay=this.thismonth.data.spbanchay;
      this.thismonth.dsdonhang=this.thismonth.data.dsdh;
     this.thismonth.tysuatloai=this.doanhthutheoloai(this.thismonth.doanhthuloai);
     console.log(  this.thismonth.doanhthu);
      setTimeout(() => {
        this.loadScripts();
      }, );
    }, err => { });
    this.doanhThuTheoLoai2(m);
    this.lastMonth(maShop,m);
  }

  doanhThuTheoLoai2(month) {
    this._api.get('api/ThongKe/doanh-thu-loai/' + 's0001' + '/' + month)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.doanhThuLoai2 = res;
        
      });
  }

  doanhthutheoloai(arr:any){
    let tg=[];
    arr.forEach(element => {
      let t=[element.tenLoai,Number.parseInt(element.income)]
      tg.push(t);
    });
return tg;
  }
  lastMonth(mashop,currmonth){
    this.lastmonth=[];
    this.lastmonth.chiphinhap=0;
    currmonth--;
    this._api.get('api/thongke/thang/'+mashop+'/'+currmonth).takeUntil(this.unsubscribe).subscribe(res => {
      this.lastmonth.data = res;
      this.lastmonth.donvixuat=this.lastmonth.data.totalAmount;
      this.lastmonth.doanhthu=this.lastmonth.data.totalValue;
      this.lastmonth.doanhthuloai=this.lastmonth.data.incomebycates;
      this.lastmonth.spbanchay=this.lastmonth.data.spbanchay;
      this.lastmonth.dsdonhang=this.lastmonth.data.dsdh;
     this.lastmonth.tysuatloai=this.doanhthutheoloai(this.lastmonth.doanhthuloai);
   
   
    }, err => { });
  }
  xemchitietloai(maLoai, bangDoanhThu: any) {
    $('#DoanhThuModal').modal('toggle');

    var kq = bangDoanhThu.filter(x =>x.loai!=null&& x.loai.maLoai == maLoai);
    console.log(kq);
    this.doanhThuLoaiChiTiet = kq;
  }

  sumAll(arr){
    var sum=0;
    arr.forEach(element => {
      sum+=parseInt(element.doanhThu);
    });
    return sum;
  }
}