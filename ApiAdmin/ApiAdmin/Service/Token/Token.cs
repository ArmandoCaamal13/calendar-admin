using ApiAdmin.Models.User;
using ApiAdmin.Utils;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Claims;

namespace ApiAdmin.Service.Token
{
    public class Token
    {
        public static string GenerateToken(User user)
        {
            string secretKey = Config.TOKEN_SECRET;
            string audienceToken = Config.TOKEN_AUDIENCE;
            string issuerToken = Config.TOKEN_ISSUER;
            string expireTime = Config.TOKEN_EXPIRE;

            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(secretKey));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.UserName) });

            var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtSecurityToken = tokenHandler.CreateJwtSecurityToken(
                audience: audienceToken,
                issuer: issuerToken,
                subject: claimsIdentity,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(expireTime)),
                signingCredentials: signingCredentials);

            var jwtTokenString = tokenHandler.WriteToken(jwtSecurityToken);
            return jwtTokenString;
        }
    }
}