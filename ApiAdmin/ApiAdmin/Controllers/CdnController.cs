using System;
using System.Collections.Specialized;
using System.IO;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ApiAdmin.Controllers
{
    public class CdnController : ApiController
    {
        [HttpGet]
        [Route("cdn/calendar")]
        public IHttpActionResult Get()
        {
            try
            {
                NameValueCollection ParameterUrl = HttpUtility.ParseQueryString(Request.RequestUri.Query);
                string site = ParameterUrl.Get("site")?.Trim();
                string domain = ParameterUrl.Get("domain")?.Trim();
                if(!string.IsNullOrEmpty(site) && !string.IsNullOrEmpty(domain))
                {
                    string pathFile = $"~/cdn/{site}-{domain}/horarios.json";
                    if(File.Exists(pathFile))
                    {
                        string data = File.ReadAllText(pathFile);
                        var response= Request.CreateResponse(System.Net.HttpStatusCode.OK);
                        response.Content = new StringContent(data, System.Text.Encoding.UTF8, "application/json");
                        return ResponseMessage(response);
                    }
                    else
                    {
                        return ResponseMessage(new HttpResponseMessage(System.Net.HttpStatusCode.NotFound));
                    }
                }
                else
                {
                    return ResponseMessage(new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest));
                }
            }
            catch (Exception error)
            {
                return Ok(error);
            }
        }
    }
}
