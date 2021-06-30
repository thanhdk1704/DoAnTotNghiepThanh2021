﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
   public class Districts
    {
        public int Id{get; set; }
      public string Name{get; set; }
      public string Type{get; set; }
      public string LatiLongTude{get; set; }
      public int ProvinceId{get; set; }
      public int SortOrder{get; set; }
      public bool IsPublished{get; set; }
      public bool IsDeleted{get; set; }
    }
}
