
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using apiAdmin.Models;
using RestSharp;

namespace apiAdmin.Controllers
{
    [ApiController]
    [Route("api/")]
    public class Schedule : ControllerBase
    {
        //[HttpGet]
        //[Route("schedule/{site}")]
        //public ActionResult<Response> GetSchedule(string site)
        //{
        //    //var client = new RestClient($"http://mvc.{site}.fr/admin/getschedule")
        //    //{
        //    //    Timeout = -1
        //    //};
        //    //var request = new RestRequest(Method.GET);
        //    //IRestResponse response = client.Execute(request);
        //    //Response _scheudle = JsonConvert.DeserializeObject<Response>(response.Content);    
        //    //return _scheudle;
        //}

        //[HttpPost]
        //[Route("schedule")]
        //public ActionResult<Response> PostSchedule(Schedules schedules)
        //{
        //    Response _schedule = null;

        //    if (schedules.key == "vnr$@puC4mnc")
        //    {
        //        var client = new RestClient($"https://www.{schedules.site}.fr/admin/SaveSchedule")
        //        {
        //            Timeout = -1
        //        };
        //        var request = new RestRequest(Method.POST);
        //        request.AddHeader("Content-Type", "application/json");
        //        request.AddParameter("application/json", JsonConvert.SerializeObject(schedules), ParameterType.RequestBody);

        //        IRestResponse response = client.Execute(request);
        //        _schedule = JsonConvert.DeserializeObject<Response>(response.Content);
        //    }
            
        //    return _schedule;
        //}
    }
}
