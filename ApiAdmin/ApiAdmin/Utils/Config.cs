using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace ApiAdmin.Utils
{
    public class Config
    {

        private static string GetValueWebConfig(string parameter, string defaultValue = null, bool is_production = true )
        {
            string Type_Around = is_production ? "" : "_DEV";
            string Name_Tag = ($"{parameter}{Type_Around}").Trim();

            if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings[Name_Tag]))
            {
                return ConfigurationManager.AppSettings[Name_Tag];
            }

            return defaultValue;
        }

        public static bool IS_PRODUCTION
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["IS_PRODUCTION"]))
                {
                    return Convert.ToBoolean(ConfigurationManager.AppSettings["IS_PRODUCTION"]);
                }

                return true;
            }
        }

        public static string TOKEN_SECRET => GetValueWebConfig("TOKEN_SCRECET_KEY", "PasswordToken");
        public static string TOKEN_AUDIENCE => GetValueWebConfig("TOKEN_AUDIENCE", "*", IS_PRODUCTION);
        public static string TOKEN_ISSUER => GetValueWebConfig("TOKEN_ISSUER", "*", IS_PRODUCTION);
        public static string TOKEN_EXPIRE => GetValueWebConfig("TOKEN_EXPIRE_MINUTES", "24");
    }
}