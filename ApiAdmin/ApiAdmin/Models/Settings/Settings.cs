using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace ApiAdmin.Models.Settings
{
    public class Settings
    {
        public static string SITE_TEST_GET
        {
            get
            {
                return ConfigurationManager.AppSettings["SITE_TEST_GET"];
            }
        }

        public static string SITE_TEST_POST
        {
            get
            {
                return ConfigurationManager.AppSettings["SITE_TEST_POST"];
            }
        }

        public static string PASSWORD
        {
            get
            {
                return ConfigurationManager.AppSettings["PASSWORD"];
            }
        }
    }
}