using ApiAdmin.Models.Calendar;
using Newtonsoft.Json;
using System;
using ApiAdmin.Models.Htpp;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace ApiAdmin.Controllers
{
    public class CdnController : ControllerBase
    {
        [HttpGet, Route("cdn/calendar")]
        public ActionResult Get([FromQuery] string site, [FromQuery] string domain)
        {
            try
            {
                //NameValueCollection ParametersUrl = HttpUtility.ParseQueryString(Request.RequestUri.Query);
                //string site = ParametersUrl.Get("site")?.Trim();
                //string domain = ParametersUrl.Get("domain")?.Trim();

                if (string.IsNullOrEmpty(site) || string.IsNullOrWhiteSpace(domain))
                {
                    //HttpContextWrapper context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
                    //string PathFile = $"C:/websites/Calendario/Calendarios/ApiAdmin/ApiAdmin/App_Data/{site}-{domain}/horarios.json";
                    //string PathFile = context.Server.MapPath($"~/cdn/{site}-{domain}/horarios.json");


                    //if (File.Exists(PathFile))
                    //{
                    //    string data = File.ReadAllText(PathFile);

                    //    //return Ok(
                    //    //new Response
                    //    //{
                    //    //   Status = 200,
                    //    //   Message = "SUCCESSFUL",
                    //    //   Data = data
                    //    //}
                    //    //);

                    //    var response = Request.CreateResponse(System.Net.HttpStatusCode.OK);
                    //    response.Content = new StringContent(data, System.Text.Encoding.UTF8, "application/json");

                    //    return ResponseMessage(response);

                        return NotFound("Se quiere parametros 'site' y 'domain' en la consulta");
                    }

                    string rutaVirtual = $"~/cdn/{site}-{domain}/horarios.json";

                    string ruta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", rutaVirtual);

                if (System.IO.File.Exists(ruta)){
                    string contenidoJson = System.IO.File.ReadAllText(ruta);
                    return Content(contenidoJson, "application/json");
                }
                else
                {
                    return NotFound($"No se encontro el arhivo Json para 'site'={site} y 'domain'={domain}.");
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

        [HttpPost, Route("cdn/calendar")]
        //public ActionResult UpdateCalendar([FromBody] JObject jsonData)
        //{
        //    //try
        //    //{
        //    //    var site = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key == "site").Value;
        //    //    var domain = Request.GetQueryNameValuePairs().FirstOrDefault(q => q.Key == "domain").Value;

        //    //    if (!string.IsNullOrEmpty(site) && !string.IsNullOrEmpty(domain))
        //    //    {
        //    //        HttpContextWrapper context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
        //    //        //string PathFile = $"C:/websites/Calendario/Calendarios/ApiAdmin/ApiAdmin/App_Data/{site}-{domain}/horarios.json";
        //    //        string pathFile = context.Server.MapPath($"~/cdn/{site}-{domain}/horarios.json");

        //    //        try
        //    //        {
        //    //            string jsonText = JsonConvert.SerializeObject(jsonData);
        //    //            using (var write = new StreamWriter(pathFile, false, Encoding.UTF8))
        //    //            {
        //    //                write.Write(jsonText);
        //    //            }

        //    //            return Ok(new Response
        //    //            {
        //    //                Status = 200,
        //    //                Message = "Ok",
        //    //                Data = jsonText
        //    //            });
        //    //        }
        //    //        catch (Exception)
        //    //        {

        //    //            throw;
        //    //        }
        //    //    }
        //    //    else
        //    //    {
        //    //        return Ok(new Response
        //    //        {
        //    //            Status = 500,
        //    //            Message = "Ha ocurrido un problema",
        //    //        });
        //    //    }
        //    //}
        //    //catch (Exception error)
        //    //{
        //    //    return Ok(new Response
        //    //    {
        //    //        Status = 500,
        //    //        Message = "Ha ocurrido un problema",
        //    //        Error = error
        //    //    });
        //    //}
        //}



        private Calendar ReadExistingCalendar(string path)
        {
            if (System.IO.File.Exists(path))
            {
                string json = System.IO.File.ReadAllText(path);
                Calendar calendar = JsonConvert.DeserializeObject<Calendar>(json);
                return calendar;
            }
            return null;
        }
    }
}
