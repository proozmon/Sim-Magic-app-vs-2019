using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace my_new_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Arctic",       // 0
            "Freezing",     // 1
            "Bracing",      // 2
            "Chilly",       // 3 
            "Cool",         // 4
            "Mild",         // 5
            "Warm",         // 6
            "Balmy",        // 7 
            "Hot",          // 8 
            "Scorching",    // 9 
            "Out of range"  // 10
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            var myArray = Enumerable.Range(1, 15)
            .Select
            (
                index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = rng.Next(-50, 50),
                    Summary = "",
                    MyString = ""
                }
            )
            .ToArray();

            foreach (var element in myArray)
            {
                var myString = "";
                int myIndex = 10;
                var tempC = element.TemperatureC;
                var summary = "";

                if (-50 <= tempC && tempC < -40)
                {
                    myIndex = 0;
                }
                    if (-40 <= tempC && tempC < -30)
                    {
                        myIndex = 1;
                    }
                    else
                        if (-30 <= tempC && tempC < -20)
                        {
                            myIndex = 2;
                        }
                        else
                            if (-20 <= tempC && tempC < -10)
                            {
                                myIndex = 3;
                            }
                            else
                                if (-10 <= tempC && tempC < 0)
                                {
                                    myIndex = 4;
                                }
                                else
                                    if (0 <= tempC && tempC < 10)
                                    {
                                        myIndex = 5;
                                    }
                                    else
                                        if (10 <= tempC && tempC < 20)
                                        {
                                            myIndex = 6;
                                        }
                                        else
                                            if (20 <= tempC && tempC < 30)
                                            {
                                                myIndex = 7;
                                            }
                                            else
                                                if (30 <= tempC && tempC <= 40)
                                                {
                                                    myIndex = 8;
                                                }
                                                else
                                                    if (40 <= tempC && tempC <= 50)
                                                    {
                                                        myIndex = 9;
                                                    }

                    summary = Summaries[myIndex];
                    element.Summary = summary;

                    myString = "Hello " + element.Summary + " poopoohead";
                    element.MyString = myString;
                }

            return myArray;
        }
    }
}
