using DAL.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using Model;
using DAL.Interfaces;
using System.Linq;

namespace DAL
{
    public partial class ThongKeRepository : IThongKeRepository
    {
        private IDatabaseHelper _dbHelper;
        public ThongKeRepository(IDatabaseHelper _dbHelper)
        {
            this._dbHelper = _dbHelper;
        }
        public ThongKeModel TongQuanThang(string mashop, int thang)
        {
            var kq = new ThongKeModel();
            kq.totalValue = 0;
            kq.totalAmount = 0;
            /* kq: 0 is amount, 1 is income,
             * 2 is total orders that paid,3 is total orders that return
            */
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "doanhthutheoshoptheothang", "@mashop", mashop, "@thang", thang);
                var dt2 = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "chiphinhaphangtheothang", "@mashop", mashop, "@thang", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) kq.totalValue = (int)dt.Rows[0]["DoanhThu"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["DonVi"] != DBNull.Value) kq.totalAmount = (int)dt.Rows[0]["DonVi"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["Orders"] != null) kq.totalOrders = (int)dt.Rows[0]["Orders"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["ChiPhi"] != DBNull.Value) kq.totalReValue = (int)dt2.Rows[0]["ChiPhi"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["DonVi"] != DBNull.Value) kq.totalReAmount = (int)dt2.Rows[0]["DonVi"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["Orders"] != null) kq.totalIR = (int)dt2.Rows[0]["Orders"];
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ThongKeModel TongQuanNam(string mashop, int nam)
        {
            var kq = new ThongKeModel();
            kq.totalValue = 0;
            kq.totalAmount = 0;
            /* kq: 0 is amount, 1 is income,
             * 2 is total orders that paid,3 is total orders that return
            */
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "doanhthutheoshoptheonam", "@mashop", mashop, "@nam", nam);
                var dt2 = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "chiphinhaphangtheonam", "@mashop", mashop, "@nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) kq.totalValue = (int)dt.Rows[0]["DoanhThu"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["DonVi"] != DBNull.Value) kq.totalAmount = (int)dt.Rows[0]["DonVi"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["Orders"] != null) kq.totalOrders = (int)dt.Rows[0]["Orders"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["ChiPhi"] != DBNull.Value) kq.totalReValue = (int)dt2.Rows[0]["ChiPhi"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["DonVi"] != DBNull.Value) kq.totalReAmount = (int)dt2.Rows[0]["DonVi"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["Orders"] != null) kq.totalIR = (int)dt2.Rows[0]["Orders"];
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DonHangModel> donhangtheothang(string mashop, int thang)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "dhtheoshoptheothang", "@mashop", mashop, "@thang", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<DonHangModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DonHangModel> donhangtheonam(string mashop, int nam)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "dhtheoshoptheonam", "@mashop", mashop, "@nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<DonHangModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<HoaDonNhapModel> phieunhaptheothang(string mashop, int thang)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "phieunhaptheoshoptheothang", "@mashop", mashop, "@thang", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<HoaDonNhapModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<HoaDonNhapModel> phieunhaptheonam(string mashop, int nam)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "phieunhaptheoshoptheonam", "@mashop", mashop, "@nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<HoaDonNhapModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void doanhthutheoloaitheothang(string mashop, int maloai, int thang, out int doanhthu, out int chiphi)
        {
            doanhthu = 0; chiphi = 0;
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "doanhthutheoloaitheothang", "@mashop", mashop, "@thang", thang, "@maloai", maloai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) doanhthu = (int)dt.Rows[0]["DoanhThu"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) chiphi = (int)dt.Rows[0]["DoanhThu"];

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void doanhthutheoloaitheoquy(string mashop, int maloai, int thang, out int doanhthu, out int chiphi)
        {
            doanhthu = 0; chiphi = 0;
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "doanhthutheoloaitheoquy", "@mashop", mashop, "@quy", thang, "@maloai", maloai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) doanhthu = (int)dt.Rows[0]["DoanhThu"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) chiphi = (int)dt.Rows[0]["DoanhThu"];

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<HoaDonNhapModel> phieunhaptheoquy(string mashop, int thang)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "phieunhaptheoshoptheoquy", "@mashop", mashop, "@quy", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<HoaDonNhapModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DonHangModel> donhangtheoquy(string mashop, int thang)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "dhtheoshoptheoquy", "@mashop", mashop, "@quy", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<DonHangModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ThongKeModel TongQuanQuy(string mashop, int thang)
        {
            var kq = new ThongKeModel();
            kq.totalValue = 0;
            kq.totalAmount = 0;
            /* kq: 0 is amount, 1 is income,
             * 2 is total orders that paid,3 is total orders that return
            */
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "doanhthutheoshoptheoquy", "@mashop", mashop, "@quy", thang);
                var dt2 = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "chiphinhaphangtheoquy", "@mashop", mashop, "@quy", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) kq.totalValue = (int)dt.Rows[0]["DoanhThu"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["DonVi"] != DBNull.Value) kq.totalAmount = (int)dt.Rows[0]["DonVi"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["Orders"] != null) kq.totalOrders = (int)dt.Rows[0]["Orders"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["ChiPhi"] != DBNull.Value) kq.totalReValue = (int)dt2.Rows[0]["ChiPhi"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["DonVi"] != DBNull.Value) kq.totalReAmount = (int)dt2.Rows[0]["DonVi"];
                if (dt2.Rows.Count > 0 && dt2.Rows[0]["Orders"] != null) kq.totalIR = (int)dt2.Rows[0]["Orders"];
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ThongKeModel BaoCaoCuoiNgay(string maShop)
        {
            ThongKeModel result = new ThongKeModel();
            string msgError = "";
            string msgError2 = "";
            string msgError3 = "";
            var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "CountDonHangHomNay", "@mashop", maShop);
            var dt2 = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError2, "DoanhThuHomNay", "@mashop", maShop);
            var dt3 = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError3, "BaoCaoCuoiNgay", "@mashop", maShop);
            result.dsdh = dt3 != null && dt3.Rows.Count > 0 ? dt3.ConvertTo<DonHangModel>().ToList() : null;
            if (dt2.Rows.Count > 0 && dt2.Rows[0]["doanhthu"] != DBNull.Value)
            {
                result.totalValue = (int)dt2.Rows[0]["doanhthu"];
            }

            if (dt2.Rows.Count > 0 && dt2.Rows[0]["donvi"] != DBNull.Value)
            {
                result.totalAmount = (int)dt2.Rows[0]["donvi"];
            }

            if (dt.Rows.Count > 0 && dt.Rows[0]["dh"] != DBNull.Value)
            {
                result.totalOrders = (int)dt.Rows[0]["dh"];
            }

            return result;
        }

        public void doanhthutheoloaitheonam(string mashop, int maloai, int nam, out int doanhthu, out int chiphi)
        {
            doanhthu = 0; chiphi = 0;
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "doanhthutheoloaitheonam", "@mashop", mashop, "@nam", nam, "@maloai", maloai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) doanhthu = (int)dt.Rows[0]["DoanhThu"];
                if (dt.Rows.Count > 0 && dt.Rows[0]["DoanhThu"] != DBNull.Value) chiphi = (int)dt.Rows[0]["DoanhThu"];

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> Spbanchay(string mashop, int thang)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "spbanchaytheoshoptheothang", "@mashop", mashop, "@thang", thang);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<SanPhamModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> Spbanchaytheonam(string mashop, int nam)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "spbanchaytheoshoptheonam", "@mashop", mashop, "@nam", nam);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<SanPhamModel>().ToList();

                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SanPhamModel> Sphethang(string mashop)
        {
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sphethangbyshop", "@mashop", mashop);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<SanPhamModel>().ToList();
                foreach (var item in kq) { }
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dateInput">thang hoac nam</param>
        /// <param name="maShop"></param>
        /// <returns></returns>
        public List<LoaiCon2Model> DoanhThuTheoLoai2(int dateInput, string maShop)
        {
            if (dateInput <= -5||dateInput==0)
            {
                return null;
            }
            string procedureName;
            string parameterName;
            if (dateInput<0)
            {
                procedureName = "DoanhThuTheoQuyTheoTungLoai";
                parameterName = "@quy";
            }
            if (dateInput>12)
            {
                procedureName = "DoanhThuTheoNamTheoTungLoai";
                parameterName = "@nam";
                dateInput *= -1;
            }

            else
            {
                procedureName = "DoanhThuTheoThangTheoTungLoai";
                parameterName = "@thang";

            }
            string msgError = "";

            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, procedureName, parameterName,dateInput,"@mashop", maShop);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                var kq = dt.ConvertTo<LoaiCon2Model>().ToList();
                foreach (var item in kq) { }
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
