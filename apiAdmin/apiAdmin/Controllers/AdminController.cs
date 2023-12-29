using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiAdmin.Controllers
{
    //[ApiController]
    //[Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        //[HttpGet]
        //[Route("schedule")]
        //public void GetSchedule()
        //{
        //    var client = new RestClient("http://mvc.aquatourscancun.com/admin/schedule");
        //    client.Timeout = -1;
        //    var request = new RestRequest(Method.GET);
        //    request.AddHeader("Cookie", "ASP.NET_SessionId=p0jnkjahxg0iksgfozacz4nx; Cart|c7ab45af-dd5c-474f-91e0-9052e61b1b20|501={\"Generated\":false,\"ReserveId\":0,\"ClientId\":0,\"Count\":0,\"Items\":[],\"Confirmation\":null,\"Reservation\":null}; SESSION_SITE_ID=501");
        //    IRestResponse response = client.Execute(request);
        //    Console.WriteLine(response.Content);
        //}
    }
}
