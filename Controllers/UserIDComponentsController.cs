using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace my_new_app.Controllers
{
    [ApiController]
    public class UserIDComponentsController : ControllerBase
    {
        private readonly ILogger<UserIDComponentsController> _logger;
        public UserIDComponentsController(ILogger<UserIDComponentsController> logger)
        {
            _logger = logger;
        }

        // **************************************************************************************
        // Notes:
        // 1. We still need to keep the explicit route below, even after including the 
        //    calling parameters in the modified [HttpDelete] attribute
        // 2. See https://www.yogihosting.com/aspnet-core-api-controllers/ for a reference 
        //    to this apparoach
        // 3. This appears to make use of the route template defined via MapHttpRoute
        //    (see the method Register(HttpConfiguration config)
        // 4. It avoids the need to get the callign parameters from the more complicated:
        //
        //    int? userID = 1112;
        //    string userName = "proozmon";
        //
        //    var thing1 = this.ControllerContext.RouteData.Values;
        //    var thing2 = thing1.GetValueOrDefault("userID");
        //    if (thing2 != null)
        //    {
        //        string thing3 = (string)thing2;
        //        userID = Int16.Parse(thing3);
        //    }
        //
        //    var thing4 = thing1.GetValueOrDefault("userName");
        //    if (thing4 != null)
        //    {
        //        userName = (string)thing4;
        //    }
        // ****************************************************************************************

        [Route("[controller]/{userID}/{userName}")]
        [HttpDelete("{userID}/{userName}")]
        public Task<bool> Delete(string userID, string userName) => this.DeleteUser(userID, userName);

        [Route("[controller]")]
        public async Task<bool> DeleteUser(string userIDParam, string userNameParam)
        {
            int? userID = 0;
            string userName = "undefined";

            if (userIDParam != null)
                userID = Int16.Parse(userIDParam);

            if (userNameParam != null)
                userName = userNameParam;

            Task<bool> result = DeleteSpecifiedUser(userID, userName);

            return await result;
        }

        private async Task<bool> DeleteSpecifiedUser(int? param1, string param2)
        {
            try
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

                    int? userId = param1;
                    string userName = param2;

                    conn.Open();

                    if (userId != null && userName != null)
                    {
                        var sqlMain = String.Format(
                                @"DELETE FROM users WHERE userName=@userName AND userID =@userID",
                                viewName);

                        var cmd = new SqlCommand(sqlMain, conn);
                        cmd.Parameters.AddWithValue("@userID", userId);
                        cmd.Parameters.AddWithValue("@userName", userName);
                        cmd.ExecuteNonQuery();
                    }

                    conn.Close();

                    return await Task.FromResult(true);
                }
            }
            catch (Exception)
            {
                return await Task.FromResult(false);
            }
        }

        [Route("[controller]")]
        [HttpGet]

        // *******************************************************************************
        // Notes:
        // 1. This method is not currently being used, since it's more compliated to 
        //    overload the HttpGet method
        // 2. Hence it was renamed "GetAll()", to prevent a conflict with the 
        //    standard Http "Get()" emthod
        // 3. Instead we use one version of the initial HttpGet and then determine 
        //    which version of the secondary get***UserIDs methods to use, based on 
        //    the calling parameters (see further notes below)
        // *******************************************************************************

        public IEnumerable<CounterComponent> GetAllRecords()
        {
            int[] userId = GetAllUserIDs();

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

        [Route("[controller]/{userName1}/{userName2}")]
        [HttpGet]

        // **********************************************************************************
        // Notes:
        // 1. Alternatively we could call overloaded getUserID() methods here 
        //    and differentiate between them, based on the parameters, but the approach 
        //    used below is clearer
        // 2. Similarly we could overload the {HttpGet] method, but that's more complicated, 
        //    as it involves tweaking the routing attribute map ... hence for now it's simpler  
        //    to have just one method with optional calling parameters 
        // 2. The calling parameters are determined from the key value pairs included 
        //    in the ControllerContext.RouteData.Values collection object
        // ************************************************************************************

        public IEnumerable<CounterComponent> GetSpecifiedRecords()
        {
            var userName1 = "";
            var userName2 = "";

            var thing = this.ControllerContext.RouteData.Values;

            var thing1 = thing.GetValueOrDefault("userName1");
            if (thing1 != null)
            {
                userName1 = (string)thing1;
            }

            var thing2 = thing.GetValueOrDefault("userName2");
            if (thing2 != null)
            {
                userName2 = (string)thing2;
            }

            int [] userId = GetSpecifiedUserIDs(userName1,userName2);

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

        private int[] GetSpecifiedUserIDs(string userName1, string userName2)
        {
            try
            {
                // var cnnString = ConfigurationManager.ConnectionStrings["SimMagicEntities"];
                var connString =
                    "Data Source=WIN-BPOM8E25HPJ;" +
                    "Initial Catalog=SimMagicDev;" +
                    "User id=Pierre;" +
                    "Password=Emilien@1914;";
                var conn = new SqlConnection(connString);

                using (conn)
                {
                    string viewName = null;
                    int[] userId = { 0, 0 };

                    if (userName1 == null)
                        userName1 = "";
                    if (userName2 == null)
                        userName2 = "";

                    // select all for now and determine the relevant column(s) later
                    var sqlMain = String.Format(
                      @"SELECT * From Users 
                    Where UserName = @userName1 
                    Or UserName = @userName2",
                        viewName);

                    conn.Open();
                    var cmd = new SqlCommand(sqlMain, conn);
                    cmd.Parameters.AddWithValue("@userName1", userName1);
                    cmd.Parameters.AddWithValue("@userName2", userName2);

                    using (cmd)
                    {
                        var dr = cmd.ExecuteReader();
                        int i = 0;
                        while (dr.Read())
                        {
                            // only read the first two records for testing, to avoid an out of range error 
                            // i.e. the userId array has only two spots
                            if (i < 2)
                            {
                                // the userID is in column 1 (where the column numnbers start at 0) 
                                //userId[0][i] = dr.GetInt16(1);
                                userId[i] = dr.GetInt16(1);
                                i++;
                            }
                        }
                    }

                    conn.Close();
                    return userId;
                }
            }
            catch (Exception)
            {
                int[] userId = { -1, -1 };
                return userId;
            }
        }

        private int[] GetAllUserIDs()
        {
            try
            {
                // var cnnString = ConfigurationManager.ConnectionStrings["SimMagicEntities"];
                var connString =
                    "Data Source=WIN-BPOM8E25HPJ;" +
                    "Initial Catalog=SimMagicDev;" +
                    "User id=Pierre;" +
                    "Password=Emilien@1914;";

                var conn = new SqlConnection(connString);
                using (conn)
                {
                    string viewName = null;
                    int[] userId = { 0, 0 };

                    // select all for now and determine the column(s) later
                    var sqlMain = String.Format(
                        @"SELECT * From Users ",
                        viewName);

                    conn.Open();
                    var cmd = new SqlCommand(sqlMain, conn);

                    using (cmd)
                    {
                        var dr = cmd.ExecuteReader();
                        int i = 0;
                        while (dr.Read())
                        {
                            // only read the first two records for testing, to avoid an out of range error 
                            // i.e. the userId array has only two spots
                            if (i < 2)
                            {
                                userId[i] = dr.GetInt16(1); // the userID is in column 1 (startig at 0) 
                                i++;
                            }
                        }
                    }

                    conn.Close();
                    return userId;
                }
            }
            catch 
            {
                int[] userId = { -1, -1 };
                return userId;
            }
        }

        [Route("[controller]")]
        [HttpPut]
        public async Task<bool> Put(UserPutRecords data)
        {
            int? userId1 = data.UserID1;
            int? userId2 = data.UserID2;
            string userName1 = data.UserName1;
            string userName2 = data.UserName2;

            Task<bool> result = PutUserID(userId1, userId2, userName1, userName2);
            
            return await result;
        }

        private Task<bool> PutUserID(int? param1, int? param2, string param3, string param4)
        {
            try 
            {
                // var cnnString = ConfigurationManager.ConnectionStrings["SimMagicEntities"];
                var connString =
                    "Data Source=WIN-BPOM8E25HPJ;" +
                    "Initial Catalog=SimMagicDev;" +
                    "User id=Pierre;" +
                    "Password=Emilien@1914;";
                var conn = new SqlConnection(connString);

                using (conn)
                {
                    string viewName = null;

                    int? userId1 = param1;
                    int? userId2 = param2;
                    string userName1 = param3;
                    string userName2 = param4;

                    conn.Open();

                    if (userId1 != null && userName1 != null)
                    {
                        var sqlMain = String.Format(
                             @"Update Users Set UserID = @userID1 Where UserName = @userName1",
                             viewName);
                        var cmd = new SqlCommand(sqlMain, conn);
                        cmd.Parameters.AddWithValue("@userID1", userId1);
                        cmd.Parameters.AddWithValue("@userName1", userName1);
                        cmd.ExecuteNonQuery();
                    }

                    if (userId2 != null && userName2 != null)
                    {
                        var sqlMain = String.Format(
                             @"update Users set UserID = @userID2 where UserName = @userName2",
                             viewName);
                        var cmd = new SqlCommand(sqlMain, conn);
                        cmd.Parameters.AddWithValue("@userID2", userId2);
                        cmd.Parameters.AddWithValue("@userName2", userName2);
                        cmd.ExecuteNonQuery();
                    }

                    conn.Close();

                    return Task.FromResult(true);
                }
            }
            catch (Exception)
            { 
                return Task.FromResult(false);
            }
        }

        [Route("[controller]")]
        [HttpPost]
        public async Task<bool> Post(UserPostRecords newUser)
        {
            int? userId = newUser.UserID;
            string userName = newUser.UserName;
            string password = newUser.password;

            Task<bool> result = PostNewUser(userId, userName, password);

            return await result; 
        }

        //private bool PutUserID(UserPostRecords thing)
        private async Task<bool> PostNewUser(int? param1, string param2, string param3)
        {
            try 
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

                    //int? userId1 = thing.CurrentCount1;
                    //int? userId2 = thing.CurrentCount2;

                    int? userId = param1;
                    string userName = param2;
                    string password = param3;

                    conn.Open();

                    if (userId != null && userName != null && password != null)
                    {
                        var sqlMain = String.Format(
                             @"insert into Users(UserID,UserName,password) values (@userID, @UserName, @password)",
                             viewName);
                        var cmd = new SqlCommand(sqlMain, conn);
                        cmd.Parameters.AddWithValue("@userID", userId);
                        cmd.Parameters.AddWithValue("@userName", userName);
                        cmd.Parameters.AddWithValue("@password", password);
                        cmd.ExecuteNonQuery();
                    }

                    conn.Close();

                    return await Task.FromResult(true);
                }
            }
            catch (Exception)
            {
                return await Task.FromResult(false);
            }
        }
    }
}
