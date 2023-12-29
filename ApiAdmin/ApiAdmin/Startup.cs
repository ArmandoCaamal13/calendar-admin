using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using Microsoft.Owin;
using System.Configuration;
using Owin;

[assembly: OwinStartup(typeof(ApiAdmin.Startup))]

namespace ApiAdmin
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "mvc.ebcal.dtraveller.com",
                        ValidAudience = "mvc.ebcal.dtraveller.com",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["TOKEN_SCRECET_KEY"]))
                    };
                });
            //services.AddMvc();
            //services.AddControllers();
            //services.AddRazorPages();
        }


        public void Configure(IApplicationBuilder app)
        {
            app.UseAuthentication();
        }

    }
}
