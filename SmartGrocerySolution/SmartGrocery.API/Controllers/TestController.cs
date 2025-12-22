using Microsoft.AspNetCore.Mvc;
using SmartGrocery.Infrastructure.Persistence;

namespace SmartGrocery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly GroceryDbContext _db;

        public TestController(GroceryDbContext db)
        {
            _db = db;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("Backend is running!");
        }
    }
}
