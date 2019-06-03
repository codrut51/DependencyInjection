using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dependencies.Logic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dependencies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CacheController : ControllerBase
    {
        // GET: api/Cache
        private readonly IUser _user;

        public CacheController(IUser user) 
        {
            _user = user;
        } 

        [HttpGet]
        public List<User> Get()
        {
            return _user.GetUsers().Result;
        }

        //// GET: api/Cache/5
        //[HttpGet("{id}", Name = "Get")]
        //public Response Get(int id)
        //{
        //    Console.WriteLine($"The id requested is: {id}");
        //    Response response = new Response();
        //    response.Message = $"value = {id}";
        //    return response;
        //}

        // POST: api/Cache
        [HttpPost]
        public async Task<User> Post([FromBody] User user)
        {
            await _user.AddUser(user);
            return user;
        }

        //// PUT: api/Cache/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }

    public class Response
    {
        public string Message { get; set; }
    }
    public class Request
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
