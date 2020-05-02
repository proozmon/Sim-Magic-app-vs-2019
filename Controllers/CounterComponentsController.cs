using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace Sim_Magic_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CounterComponentsController : ControllerBase
    {
        static int? currentCount1;
        static int? currentCount2;

        public void IncrementCounter()
        {
            if (currentCount1 != null)
            {
                currentCount1++;
            }
            else
            {
                currentCount1 = 1;
            }

            if (currentCount2 != null)
            {
                currentCount2 += 2;
            }
            else
            {
                currentCount2 = 2;
            }
        }

        private readonly ILogger<CounterComponentsController> _logger;

        public CounterComponentsController(ILogger<CounterComponentsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<CounterComponent> Get()
        {

            //this.IncrementCounter();

            int[] userId = GetUserID();

            var myArray = Enumerable.Range(1, 2)
                        .Select
                        (
                            index => new CounterComponent
                            {
                                CurrentCount1 = userId[0],
                                CurrentCount2 = userId[1]
                            }
                        )
                        .ToArray();

                return myArray;           
        }

        private int[] GetUserID()
        {
            // var cnnString = ConfigurationManager.ConnectionStrings["SimMagicEntities"];
            var connString =
                "Data Source=WIN-BPOM8E25HPJ;" +
                "Initial Catalog=SimMagicDev;" +
                "User id=Pierre;" +
                "Password=Emilien@1914;";

            using (var conn = new SqlConnection(connString))
            {
                string viewName = null;

                int[] userId = { 0, 0 };

                var sqlMain = String.Format(
                    @"SELECT * From Users",
                    viewName);

                conn.Open();

                using (var cmd = new SqlCommand(sqlMain, conn))
                {
                    var dr = cmd.ExecuteReader();
                    int i = 0;
                    while (dr.Read())
                    {
                        userId[i] = dr.GetInt16(2);
                        i++;
                    }
                }

                conn.Close();
                return userId;
            }
        }
    }
}
