import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

declare var $: any;
@Component({
  selector: 'app-donhang',
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.css']
})
export class DonhangComponent extends BaseComponent implements OnInit {
  listTrangThai: any;
  index: any;
  size: any;
  val: any;
  donhangs: any;
  donhang: any;
  total: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.listTrangThai = [
      { name: "chưa xác nhận", value: 0, color: 'rgb(233, 253, 49)' },
      { name: "đã xác nhận", value: 1, color: 'rgb(149, 211, 5)' },
      { name: "đã đóng gói", value: 2, color: 'rgb(192, 251, 253)' },
      { name: "đang giao hàng", value: 3, color: 'rgb(81, 182, 250)' },
      { name: "đã giao hàng", value: 4, color: 'rgb(129, 255, 129)' },
      { name: "đã thanh toán", value: 5, color: 'rgb(58, 247, 58)' },
      { name: "đã hủy đơn", value: 6, color: 'rgb(224, 224, 222)' },
      { name: "đã trả hàng", value: 7, color: null }
    ];

    this.index = 1; this.size = 20;
    this.donhangs = [];
    this.total = 0;
    this._api.get('api/QLDonHang/getbyshop/s0001/' + this.index + '/' + this.size).takeUntil(this.unsubscribe).subscribe(res => {
      this.val = res;
      this.donhangs = this.val.data;
      this.total = this.val.totalItems;

    }, err => { });
  }
  orderById(madon) {
    this._api.get('api/QLDonHang/by-id/' + madon).takeUntil(this.unsubscribe).subscribe(res => {
      this.donhang = res;
      $('#ctdhModal').modal('toggle');
      document.getElementById('titleCtdh').innerHTML = 'Chi tiết đơn hàng';
      document.getElementById('maDH').innerHTML = this.donhang.maDH;
      document.getElementById('tenKH').innerHTML = this.donhang.thongtinkh.hoTen;
      document.getElementById('diaChi').innerHTML = this.donhang.diachinhanhang.chiTiet + ', ' +
        this.donhang.diachinhanhang.ttxa.type + ' ' + this.donhang.diachinhanhang.ttxa.name + ', ' +
        this.donhang.diachinhanhang.tthuyen.type + ' ' + this.donhang.diachinhanhang.tthuyen.name + ', ' +
        this.donhang.diachinhanhang.tttinh.type + ' ' + this.donhang.diachinhanhang.tttinh.name
        ;
      document.getElementById('soDT').innerHTML = this.donhang.diachinhanhang.soDienThoai;
      switch (this.donhang.trangThai) {
        case 0:
          document.getElementById('trangThai').innerHTML = 'Chưa xác nhận';
          break;

        case 1:
          document.getElementById('trangThai').innerHTML = 'Đã xác nhận';
          break;

        case 2:
          document.getElementById('trangThai').innerHTML = 'Đã đóng gói';
          break;

        case 3:
          document.getElementById('trangThai').innerHTML = 'Đang giao hàng';
          break;

        case 4:
          document.getElementById('trangThai').innerHTML = 'Đã nhận hàng';
          break;

        case 5:
          document.getElementById('trangThai').innerHTML = 'Đã thanh toán';
          break;

        case 6:
          document.getElementById('trangThai').innerHTML = 'Đã hủy đơn';
          break;

        case 7:
          document.getElementById('trangThai').innerHTML = 'Đã trả hàng';
          break;
        default:
          break;
      }
    }, err => { });
  }

  loadPage(page) {
    this._api.get('api/QLDonHang/getbyshop/s0001/' + page + '/' + this.size).takeUntil(this.unsubscribe).subscribe(res => {
      this.val = res;
      this.donhangs = this.val.data;
      this.total = this.val.totalItems;

    }, err => { });
  }
  changeStatus(madon) {
    this._api.get('api/QLDonHang/change-stt/' + madon).takeUntil(this.unsubscribe).subscribe(res => {
      document.getElementById('success_bar').style.display = '';
      document.getElementById('success_title').innerHTML = 'Thành công!';
      document.getElementById('success_mess').innerHTML = 'Đã thay đổi trạng thái đơn hàng.';
      this.loadPage(1);

    }, err => { });
  }
  inHoaDonXuat() {
    window.print();
  }

  cancelOrder(madon) {

    if (confirm("bạn có muốn hủy đơn?")) {
      this._api.get('api/QLDonHang/cancel/' + madon).takeUntil(this.unsubscribe).subscribe(res => {

        this.loadPage(1);
        alert("đơn hàng " + madon + " đã bị hủy.")
      }, err => { });
    }
  }
}
