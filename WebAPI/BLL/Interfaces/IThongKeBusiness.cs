using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IThongKeBusiness
    {
        ThongKeModel BaoCaoCuoiNgay(string maShop);
        List<LoaiCon2Model> DoanhThuTheoLoai2(int date, string maShop);
        ThongKeModel ThongkeNam(string mashop, int nam);
        ThongKeModel ThongkeQuy(string mashop, int quy);
        ThongKeModel ThongkeThang(string mashop, int thang);
    }
}
