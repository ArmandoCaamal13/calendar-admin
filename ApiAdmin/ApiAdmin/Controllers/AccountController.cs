using ApiAdmin.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApiAdmin.Service.Token;
using System.Web.Http.Cors;
using System.Web;
using System.Threading.Tasks;

namespace ApiAdmin.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountController : ApiController
    {

        //[AllowAnonymous]
        //[HttpPost]
        //[Route("account/login")]
        //public IHttpActionResult Login(User user)
        //{
        //    List<User> _user = new List<User>()
        //    {
        //          new User(){ Name = "esteban guzman", Role = 1, UserName = "administrador", Password = "_DolphinDiscovery2022@" }
        //    };

        //    User userFound = _user.Find(item => item.UserName == user.UserName && item.Password == user.Password);

        //    if (userFound != null)
        //    {
        //        var result = Token.GenerateToken(userFound);

        //        return Ok(new
        //        {
        //            status = 200,
        //            message = "has been entered correctly",
        //            data = new
        //            {
        //                token = result,
        //                user = user.UserName,
        //                name = user.Name,
        //                role = user.Role
        //            }
        //        });
        //    }

        //    return Ok(new
        //    {
        //        status = 405,
        //        message = "login error"
        //    });

        //}

        //[AllowAnonymous]
        //[HttpPost]
        //[Route("account/login")]
        //public IHttpActionResult UserLogin([FromBody] UserLogin user)
        //{
        //    try
        //    {
        //        if (user.UserName == "administrador" && user.Password == "_DolphinDiscovery2022@" && user.Role == 1)
        //        {
        //            var loggedInUser = new UserLogin
        //            {
        //                UserName = user.UserName,
        //                Password = user.Password,
        //                Role = user.Role
        //            };
        //            return Ok(loggedInUser);
        //        }
        //        else
        //        {
        //            return BadRequest("Username or password is incorrect");
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

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
