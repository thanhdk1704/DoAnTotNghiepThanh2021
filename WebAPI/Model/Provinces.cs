﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
   public class Provinces
    {
        public int Id{get;set;}
      public string Name{get;set;}
      public string Type{get;set;}
      public string TelephoneCode{get;set;}
      public string ZipCode{get;set;}
      public int CountryId{get;set;}
      public string CountryCode{get;set;}
      public int SortOrder{get;set;}
      public bool IsPublished{get;set;}
      public bool IsDeleted{get;set;}
    }
}
