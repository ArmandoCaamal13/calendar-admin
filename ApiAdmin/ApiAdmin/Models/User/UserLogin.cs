using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiAdmin.Models.User
{
    public class UserLogin
    {
        public string UserName { get; set; }    
        public string Password { get; set; }
        //public int Role { get; set; }
    }
}