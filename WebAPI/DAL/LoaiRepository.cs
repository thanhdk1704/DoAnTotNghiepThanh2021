using DAL.Helper;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public partial class LoaiRepository:ILoaiRepository
    {
        private IDatabaseHelper _dbHelper;
        public LoaiRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<LoaiModel> GetDataAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getallLoai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<LoaiCon1Model> GetLoai1()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getloai1");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiCon1Model>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<LoaiCon2Model> GetLoai2()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getloai2");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiCon2Model>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<LoaiCon1Model> getloai1byloai(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getloai1id", "@id", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiCon1Model>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<LoaiCon2Model> getbyloai1(string id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getloai2id", "@id", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiCon2Model>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public List<LoaiCon2Model> getbyid(string id)
        //{
        //    string msgError = "";
        //    try
        //    {
        //        var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getloai2id", "@id", id);
        //        if (!string.IsNullOrEmpty(msgError))
        //            throw new Exception(msgError);
        //        return dt.ConvertTo<LoaiCon2Model>().ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public LoaiModel GetLoaiByID(int MaLoai)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetLoaiByMa", "@MaLoai", MaLoai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public LoaiCon1Model GetLoai1ByID(string MaLoai)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetLoai1ByMa", "@MaLoai", MaLoai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiCon1Model>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
