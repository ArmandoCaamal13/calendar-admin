using System.Web.Http;
using ApiAdmin.Service.Token;
using Microsoft.AspNetCore.Cors;

namespace ApiAdmin
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web

            // Rutas de API web
            var cors = new EnableCorsAttribute();
            config.MessageHandlers.Add(new TokenValidationHandler());
            //config.EnableCors(cors);
            config.MapHttpAttributeRoutes();
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
    }
}
