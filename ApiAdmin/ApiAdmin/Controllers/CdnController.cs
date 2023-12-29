using ApiAdmin.Models.Calendar;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using ApiAdmin.Service.File;
using ApiAdmin.Models.Htpp;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Policy;
using System.Web.Http;
using ApiAdmin.Models;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Runtime.Remoting.Contexts;

namespace ApiAdmin.Controllers
{
    public class CdnController : ApiController
    {
        [System.Web.Http.HttpGet, System.Web.Http.Route("cdn/calendar")]
        public IHttpActionResult Get()
        {
            try
            {
                NameValueCollection ParametersUrl = HttpUtility.ParseQueryString(Request.RequestUri.Query);
                string site = ParametersUrl.Get("site")?.Trim();
                string domain = ParametersUrl.Get("domain")?.Trim();

                if (!string.IsNullOrEmpty(site) && !string.IsNullOrWhiteSpace(domain))
                {
                    HttpContextWrapper context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
                    //string PathFile = $"C:/websites/Calendario/Calendarios/ApiAdmin/ApiAdmin/App_Data/{site}-{domain}/horarios.json";
                    string PathFile = context.Server.MapPath($"~/cdn/{site}-{domain}/horarios.json");
                    if (File.Exists(PathFile))
                    {
                        string data = File.ReadAllText(PathFile);

                        //return Ok(
                        //new Response
                        //{
                        //   Status = 200,
                        //   Message = "SUCCESSFUL",
                        //   Data = data
                        //}
                        //);

                        var response = Request.CreateResponse(System.Net.HttpStatusCode.OK);
                        response.Content = new StringContent(data, System.Text.Encoding.UTF8, "application/json");

                        return ResponseMessage(response);
                    }
                    else
                    {
                        return Ok(
                            new Response
                            {
                                Status = 404,
                                Message = "El archivo JSON no existe en la ruta especificada"
                            }
                        );
                    }
                }


                return Ok(
                    new Response
                    {
                        Status = 405,
                        Message = "Faltan parametros"
                    }
                );

            }
            catch (Exception error)
            {
                return Ok(new Response
                {
                    Status = 500,
                    Message = "Ha ocurrido un problema",
                    Error = error
                });
            }
        }

        [System.Web.Http.HttpPost, System.Web.Http.Route("cdn/calendar")]
        public IHttpActionResult UpdateCalendar([System.Web.Http.FromBody] JObject jsonData)
        {
            try
            {
                var site = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key == "site").Value;
                var domain = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key == "domain").Value;

                if (!string.IsNullOrEmpty(site) && !string.IsNullOrEmpty(domain))
                {
                    HttpContextWrapper context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
                    //string PathFile = $"C:/websites/Calendario/Calendarios/ApiAdmin/ApiAdmin/App_Data/{site}-{domain}/horarios.json";
                    string pathFile = context.Server.MapPath($"~/cdn/{site}-{domain}/horarios.json");

                    try
                    {
                        string jsonText = JsonConvert.SerializeObject(jsonData);
                        using (var write = new StreamWriter(pathFile, false, Encoding.UTF8))
                        {
                            write.Write(jsonText);
                        }

                        return Ok(new Response
                        {
                            Status = 200,
                            Message = "Ok",
                            Data = jsonText
                        });
                    }
                    catch (Exception)
                    {

                        throw;
                    }
                }
                else
                {
                    return Ok(new Response
                    {
                        Status = 500,
                        Message = "Ha ocurrido un problema",
                    });
                }
            }
            catch (Exception error)
            {
                return Ok(new Response
                {
                    Status = 500,
                    Message = "Ha ocurrido un problema",
                    Error = error
                });
            }
        }



        private Calendar ReadExistingCalendar(string path)
        {
            if (File.Exists(path))
            {
                string json = File.ReadAllText(path);
                Calendar calendar = JsonConvert.DeserializeObject<Calendar>(json);
                return calendar;
            }
            return null;
        }
    }
}
