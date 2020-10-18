using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using payroll_prototype.Models;

namespace payroll_prototype.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration, ILogger<HomeController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public IActionResult Index()
        {
            @ViewData["View"] = "home";
            return View();
        }

        public IActionResult LoginAttempt(string username, string password)
        {
            UsersContext currentUser = new UsersContext(username, password, _configuration["ConnectionStrings:Default"]);
            if (currentUser.IsValid())
            {
                return Content(currentUser.GetFName() + "!" + currentUser.GetLName() + "!" + currentUser.GetUserName() + "!" + currentUser.GetPassword());
            }// end if
            return Content("Invalid");
        }//end LoginAttempt

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
