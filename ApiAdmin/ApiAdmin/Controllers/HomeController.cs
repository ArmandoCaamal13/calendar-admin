using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiAdmin.Controllers
{
    public class HomeController : ApiController
    {
        [HttpGet,Route("~/")]
        public IHttpActionResult Get()
        {
            return Ok(new
            {
                message = "Unauthorized access"
            });
        }
    }
}
