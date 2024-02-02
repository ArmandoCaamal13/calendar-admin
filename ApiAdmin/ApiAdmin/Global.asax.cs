

using System.Web.Http;

namespace ApiAdmin
{
    public class WebApiApplication 
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
