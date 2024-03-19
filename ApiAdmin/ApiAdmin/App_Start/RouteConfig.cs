using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System.Web.Mvc;

namespace ApiAdmin
{
    public class RouteConfig
    {
        public static void Configure(IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        }
    }
}
