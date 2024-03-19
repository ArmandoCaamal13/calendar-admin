using ApiAdmin.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApiAdmin.Service.Token;
using System.Web;
using System.Threading.Tasks;
using System.Web.Http.Cors;

namespace ApiAdmin.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountController : ApiController
    {

        private static readonly Dictionary<string, string> Users = new Dictionary<string, string>
        {
            {"administrador", "_DolphinDiscovery2022@" }
        };

        private static readonly Dictionary<string, string> ActiveSessions = new Dictionary<string, string>();

        [AllowAnonymous]
        [HttpPost]
        [Route("account/login")]
        public IHttpActionResult UserLogin([FromBody] UserLogin user)
        {
            if (Users.TryGetValue(user.UserName, out string expectedPassword) && expectedPassword == user.Password)
            {
                string token = Guid.NewGuid().ToString();
                ActiveSessions[token] = user.UserName;
                return Ok(new {token});
            }
            return Unauthorized();
        }
    }

}
