using Microsoft.AspNetCore.Mvc;



namespace ApiAdmin.Controllers
{
    public class HomeController : ControllerBase
    {
        [HttpGet,Route("~/")]
        public IActionResult Get()
        {
            return Ok(new
            {
                message = "Unauthorized access"
            });
        }
    }
}
