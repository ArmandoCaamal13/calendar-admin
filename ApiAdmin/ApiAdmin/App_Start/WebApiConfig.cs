using ApiAdmin.Service.Token;
using System.Web.Http;
using System.Web.Http.Cors;
namespace ApiAdmin
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.MessageHandlers.Add(new TokenValidationHandler());
            config.EnableCors(cors);
            config.MapHttpAttributeRoutes();
        }
    }
}
