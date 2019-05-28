using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dependencies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CacheController : ControllerBase
    {
        // GET: api/Cache
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Cache/5
        [HttpGet("{id}", Name = "Get")]
        public Response Get(int id)
        {
            Console.WriteLine($"The id requested is: {id}");
            Response response = new Response();
            response.Message = $"value = {id}";
            return response;
        }

        // POST: api/Cache
        [HttpPost]
        public Response Post([FromBody] Request req)
        {
            Response response = new Response();
            response.Message = req.Message;
            return response;
        }

        // PUT: api/Cache/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class Response
    {
        public string Message { get; set; }
    }
    public class Request
    {
        public string Message { get; set; }
    }
}
